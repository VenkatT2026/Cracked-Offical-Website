const express = require('express');
const PracticeTest = require('../models/PracticeTest');
const Question = require('../models/Question');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Start a new practice test
router.post('/start', authenticateToken, async (req, res) => {
  try {
    const { testType = 'full-test' } = req.body;

    // Check if user has an active test
    const activeTest = await PracticeTest.findOne({
      user: req.user._id,
      status: 'in-progress'
    });

    if (activeTest) {
      return res.status(400).json({ 
        message: 'You already have an active test. Please complete or pause it first.',
        activeTestId: activeTest._id
      });
    }

    // Get questions based on test type
    let questions;
    if (testType === 'full-test') {
      questions = await Question.find({ isActive: true })
        .sort({ module: 1, questionNumber: 1 })
        .limit(98);
    } else {
      const questionCount = testType.includes('english') ? 54 : 44; // English: 54, Math: 44
      questions = await Question.find({ 
        isActive: true,
        module: testType
      })
        .sort({ questionNumber: 1 })
        .limit(questionCount);
    }

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions available for this test type' });
    }

    // Create new practice test
    const practiceTest = new PracticeTest({
      user: req.user._id,
      testType,
      timeRemaining: testType === 'full-test' ? 180 * 60 : 90 * 60, // 3 hours for full, 1.5 for modules
      currentQuestion: 1
    });

    const newTest = await practiceTest.save();

    res.status(201).json({
      message: 'Practice test started successfully',
      test: newTest,
      totalQuestions: questions.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current question
router.get('/current-question/:testId', authenticateToken, async (req, res) => {
  try {
    const practiceTest = await PracticeTest.findById(req.params.testId);
    
    if (!practiceTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (practiceTest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (practiceTest.status !== 'in-progress') {
      return res.status(400).json({ message: 'Test is not in progress' });
    }

    // Get the current question
    const question = await Question.findOne({
      isActive: true,
      module: practiceTest.testType === 'full-test' ? 
        (practiceTest.currentQuestion <= 54 ? 'english-1' : 
         practiceTest.currentQuestion <= 108 ? 'english-2' :
         practiceTest.currentQuestion <= 152 ? 'math-1' : 'math-2') :
        practiceTest.testType,
      questionNumber: practiceTest.currentQuestion
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Remove correct answer for security
    const questionForUser = {
      _id: question._id,
      questionNumber: question.questionNumber,
      module: question.module,
      questionType: question.questionType,
      questionText: question.questionText,
      passage: question.passage,
      options: question.options,
      timeLimit: question.timeLimit
    };

    res.json({
      test: practiceTest,
      question: questionForUser,
      progress: practiceTest.progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit answer for current question
router.post('/answer/:testId', authenticateToken, async (req, res) => {
  try {
    const { answer, timeSpent } = req.body;
    
    const practiceTest = await PracticeTest.findById(req.params.testId);
    
    if (!practiceTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (practiceTest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (practiceTest.status !== 'in-progress') {
      return res.status(400).json({ message: 'Test is not in progress' });
    }

    // Get the current question
    const question = await Question.findOne({
      isActive: true,
      module: practiceTest.testType === 'full-test' ? 
        (practiceTest.currentQuestion <= 54 ? 'english-1' : 
         practiceTest.currentQuestion <= 108 ? 'english-2' :
         practiceTest.currentQuestion <= 152 ? 'math-1' : 'math-2') :
        practiceTest.testType,
      questionNumber: practiceTest.currentQuestion
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if answer is correct
    const isCorrect = answer === question.correctAnswer;

    // Add response to test
    practiceTest.responses.push({
      questionId: question._id,
      userAnswer: answer,
      isCorrect,
      timeSpent: timeSpent || 0
    });

    // Update question statistics
    await question.updateStats(timeSpent || 0, isCorrect);

    // Move to next question or complete test
    const totalQuestions = practiceTest.testType === 'full-test' ? 98 : 
                          practiceTest.testType.includes('english') ? 54 : 44;

    if (practiceTest.currentQuestion >= totalQuestions) {
      // Complete the test
      practiceTest.status = 'completed';
      practiceTest.endTime = new Date();
      practiceTest.totalTime = Math.round((practiceTest.endTime - practiceTest.startTime) / 60000);
      practiceTest.calculateScore();
    } else {
      // Move to next question
      practiceTest.currentQuestion += 1;
    }

    await practiceTest.save();

    res.json({
      message: 'Answer submitted successfully',
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      test: practiceTest,
      isComplete: practiceTest.status === 'completed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Pause test
router.patch('/pause/:testId', authenticateToken, async (req, res) => {
  try {
    const practiceTest = await PracticeTest.findById(req.params.testId);
    
    if (!practiceTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (practiceTest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (practiceTest.status !== 'in-progress') {
      return res.status(400).json({ message: 'Test is not in progress' });
    }

    practiceTest.status = 'paused';
    await practiceTest.save();

    res.json({ message: 'Test paused successfully', test: practiceTest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resume test
router.patch('/resume/:testId', authenticateToken, async (req, res) => {
  try {
    const practiceTest = await PracticeTest.findById(req.params.testId);
    
    if (!practiceTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (practiceTest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (practiceTest.status !== 'paused') {
      return res.status(400).json({ message: 'Test is not paused' });
    }

    practiceTest.status = 'in-progress';
    await practiceTest.save();

    res.json({ message: 'Test resumed successfully', test: practiceTest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get test results
router.get('/results/:testId', authenticateToken, async (req, res) => {
  try {
    const practiceTest = await PracticeTest.findById(req.params.testId)
      .populate('responses.questionId');
    
    if (!practiceTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (practiceTest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (practiceTest.status !== 'completed') {
      return res.status(400).json({ message: 'Test is not completed' });
    }

    // Calculate estimated SAT score
    const estimatedScore = practiceTest.estimatedScore;

    res.json({
      test: practiceTest,
      estimatedScore,
      detailedResults: {
        english: {
          correct: practiceTest.score.english.correct,
          total: practiceTest.score.english.total,
          percentage: practiceTest.score.english.percentage
        },
        math: {
          correct: practiceTest.score.math.correct,
          total: practiceTest.score.math.total,
          percentage: practiceTest.score.math.percentage
        },
        overall: {
          correct: practiceTest.score.overall.correct,
          total: practiceTest.score.overall.total,
          percentage: practiceTest.score.overall.percentage
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's test history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const tests = await PracticeTest.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await PracticeTest.countDocuments({ user: req.user._id });
    
    res.json({
      tests,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalTests: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get test statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalTests = await PracticeTest.countDocuments({ user: req.user._id });
    const completedTests = await PracticeTest.countDocuments({ 
      user: req.user._id, 
      status: 'completed' 
    });
    
    // Get average scores
    const completedTestsData = await PracticeTest.find({ 
      user: req.user._id, 
      status: 'completed' 
    });
    
    const averageScores = {
      english: 0,
      math: 0,
      overall: 0
    };
    
    if (completedTestsData.length > 0) {
      const totalEnglish = completedTestsData.reduce((sum, test) => sum + test.score.english.percentage, 0);
      const totalMath = completedTestsData.reduce((sum, test) => sum + test.score.math.percentage, 0);
      const totalOverall = completedTestsData.reduce((sum, test) => sum + test.score.overall.percentage, 0);
      
      averageScores.english = Math.round(totalEnglish / completedTestsData.length);
      averageScores.math = Math.round(totalMath / completedTestsData.length);
      averageScores.overall = Math.round(totalOverall / completedTestsData.length);
    }
    
    res.json({
      totalTests,
      completedTests,
      averageScores,
      recentTests: completedTestsData.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 