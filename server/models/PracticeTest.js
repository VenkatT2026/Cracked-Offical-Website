const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true
  },
  module: {
    type: String,
    enum: ['english-1', 'english-2', 'math-1', 'math-2'],
    required: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'fill-in-blank', 'essay'],
    default: 'multiple-choice'
  },
  questionText: {
    type: String,
    required: true
  },
  options: [{
    letter: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  timeLimit: {
    type: Number, // in seconds
    default: 60
  }
});

const userResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  userAnswer: {
    type: String
  },
  isCorrect: {
    type: Boolean
  },
  timeSpent: {
    type: Number // in seconds
  },
  answeredAt: {
    type: Date,
    default: Date.now
  }
});

const practiceTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    enum: ['full-test', 'english-1', 'english-2', 'math-1', 'math-2'],
    default: 'full-test'
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'paused'],
    default: 'in-progress'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  totalTime: {
    type: Number // in minutes
  },
  score: {
    english: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    math: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    overall: {
      correct: { type: Number, default: 0 },
      total: { type: Number, default: 98 },
      percentage: { type: Number, default: 0 }
    }
  },
  responses: [userResponseSchema],
  currentQuestion: {
    type: Number,
    default: 1
  },
  timeRemaining: {
    type: Number, // in seconds
    default: 180 * 60 // 3 hours for full test
  },
  settings: {
    showTimer: { type: Boolean, default: true },
    showProgress: { type: Boolean, default: true },
    allowReview: { type: Boolean, default: true },
    autoSubmit: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Virtual for test progress
practiceTestSchema.virtual('progress').get(function() {
  return (this.currentQuestion / 98) * 100;
});

// Virtual for estimated score
practiceTestSchema.virtual('estimatedScore').get(function() {
  if (this.responses.length === 0) return 0;
  const correct = this.responses.filter(r => r.isCorrect).length;
  return Math.round((correct / this.responses.length) * 1600);
});

// Method to calculate final score
practiceTestSchema.methods.calculateScore = function() {
  const englishResponses = this.responses.filter(r => 
    r.questionId && r.questionId.module && r.questionId.module.startsWith('english')
  );
  const mathResponses = this.responses.filter(r => 
    r.questionId && r.questionId.module && r.questionId.module.startsWith('math')
  );

  this.score.english.correct = englishResponses.filter(r => r.isCorrect).length;
  this.score.english.total = englishResponses.length;
  this.score.english.percentage = this.score.english.total > 0 ? 
    Math.round((this.score.english.correct / this.score.english.total) * 100) : 0;

  this.score.math.correct = mathResponses.filter(r => r.isCorrect).length;
  this.score.math.total = mathResponses.length;
  this.score.math.percentage = this.score.math.total > 0 ? 
    Math.round((this.score.math.correct / this.score.math.total) * 100) : 0;

  this.score.overall.correct = this.responses.filter(r => r.isCorrect).length;
  this.score.overall.total = this.responses.length;
  this.score.overall.percentage = this.score.overall.total > 0 ? 
    Math.round((this.score.overall.correct / this.score.overall.total) * 100) : 0;

  return this.score;
};

// Indexes
practiceTestSchema.index({ user: 1, status: 1 });
practiceTestSchema.index({ user: 1, createdAt: -1 });
practiceTestSchema.index({ status: 1 });

module.exports = mongoose.model('PracticeTest', practiceTestSchema); 