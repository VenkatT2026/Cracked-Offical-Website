// Practice Test Application
class PracticeTestApp {
  constructor() {
    this.API_BASE_URL = 'http://localhost:5000/api';
    this.currentTest = null;
    this.currentQuestion = null;
    this.userAnswers = {};
    this.questionStartTime = Date.now();
    this.timerInterval = null;
    this.isTestActive = false;
    
    this.initializeElements();
    this.bindEvents();
    this.checkAuthentication();
  }

  initializeElements() {
    // Header elements
    this.currentQuestionEl = document.getElementById('currentQuestion');
    this.totalQuestionsEl = document.getElementById('totalQuestions');
    this.timeRemainingEl = document.getElementById('timeRemaining');
    this.pauseBtn = document.getElementById('pauseBtn');
    this.submitBtn = document.getElementById('submitBtn');

    // Navigation elements
    this.questionGrid = document.getElementById('questionGrid');
    this.progressFill = document.getElementById('progressFill');
    this.moduleIndicator = document.getElementById('moduleIndicator');

    // Question elements
    this.questionNumberEl = document.getElementById('questionNumber');
    this.questionTypeEl = document.getElementById('questionType');
    this.questionTextEl = document.getElementById('questionText');
    this.readingPassageEl = document.getElementById('readingPassage');
    this.passageContentEl = document.getElementById('passageContent');
    this.answerOptionsEl = document.getElementById('answerOptions');

    // Navigation buttons
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    // Modals
    this.pauseModal = document.getElementById('pauseModal');
    this.resultsModal = document.getElementById('resultsModal');
    this.loadingOverlay = document.getElementById('loadingOverlay');

    // Results elements
    this.overallScoreEl = document.getElementById('overallScore');
    this.englishScoreEl = document.getElementById('englishScore');
    this.mathScoreEl = document.getElementById('mathScore');
    this.timeTakenEl = document.getElementById('timeTaken');
    this.questionsAnsweredEl = document.getElementById('questionsAnswered');
    this.estimatedScoreEl = document.getElementById('estimatedScore');
  }

  bindEvents() {
    // Button events
    this.pauseBtn.addEventListener('click', () => this.pauseTest());
    this.submitBtn.addEventListener('click', () => this.submitTest());
    this.prevBtn.addEventListener('click', () => this.previousQuestion());
    this.nextBtn.addEventListener('click', () => this.nextQuestion());

    // Modal events
    document.getElementById('resumeBtn').addEventListener('click', () => this.resumeTest());
    document.getElementById('exitBtn').addEventListener('click', () => this.exitTest());
    document.getElementById('reviewBtn').addEventListener('click', () => this.reviewAnswers());
    document.getElementById('newTestBtn').addEventListener('click', () => this.startNewTest());
    document.getElementById('homeBtn').addEventListener('click', () => this.goHome());

    // Close modals on outside click
    this.pauseModal.addEventListener('click', (e) => {
      if (e.target === this.pauseModal) this.pauseModal.classList.remove('active');
    });
    this.resultsModal.addEventListener('click', (e) => {
      if (e.target === this.resultsModal) this.resultsModal.classList.remove('active');
    });
  }

  async checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please log in to access practice tests.');
      window.location.href = '/';
      return;
    }

    // Start the test automatically
    await this.startTest();
  }

  async startTest() {
    try {
      this.showLoading(true);
      
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.API_BASE_URL}/practice-tests/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ testType: 'full-test' })
      });

      if (!response.ok) {
        throw new Error('Failed to start test');
      }

      const data = await response.json();
      this.currentTest = data.test;
      this.isTestActive = true;

      // Initialize question grid
      this.initializeQuestionGrid();
      
      // Load first question
      await this.loadQuestion(1);
      
      // Start timer
      this.startTimer();
      
      this.showLoading(false);
    } catch (error) {
      console.error('Error starting test:', error);
      alert('Failed to start test. Please try again.');
      this.showLoading(false);
    }
  }

  initializeQuestionGrid() {
    this.questionGrid.innerHTML = '';
    
    for (let i = 1; i <= 98; i++) {
      const questionItem = document.createElement('div');
      questionItem.className = 'question-item';
      questionItem.textContent = i;
      questionItem.addEventListener('click', () => this.goToQuestion(i));
      
      if (i === 1) {
        questionItem.classList.add('current');
      }
      
      this.questionGrid.appendChild(questionItem);
    }
  }

  async loadQuestion(questionNumber) {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.API_BASE_URL}/practice-tests/current-question/${this.currentTest._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load question');
      }

      const data = await response.json();
      this.currentQuestion = data.question;
      
      this.displayQuestion(data.question, questionNumber);
      this.updateNavigation(questionNumber);
      this.questionStartTime = Date.now();
      
    } catch (error) {
      console.error('Error loading question:', error);
      alert('Failed to load question. Please try again.');
    }
  }

  displayQuestion(question, questionNumber) {
    // Update question number
    this.questionNumberEl.textContent = questionNumber;
    this.currentQuestionEl.textContent = questionNumber;
    
    // Update question type
    this.questionTypeEl.textContent = this.getQuestionTypeName(question.questionType);
    
    // Update module indicator
    this.updateModuleIndicator(question.module);
    
    // Display reading passage if available
    if (question.passage) {
      this.readingPassageEl.style.display = 'block';
      this.passageContentEl.textContent = question.passage;
    } else {
      this.readingPassageEl.style.display = 'none';
    }
    
    // Display question text
    this.questionTextEl.textContent = question.questionText;
    
    // Display answer options
    this.displayAnswerOptions(question.options, questionNumber);
    
    // Update question grid
    this.updateQuestionGrid(questionNumber);
  }

  displayAnswerOptions(options, questionNumber) {
    this.answerOptionsEl.innerHTML = '';
    
    options.forEach(option => {
      const optionItem = document.createElement('div');
      optionItem.className = 'option-item';
      
      const isSelected = this.userAnswers[questionNumber] === option.letter;
      if (isSelected) {
        optionItem.classList.add('selected');
      }
      
      optionItem.innerHTML = `
        <div class="option-letter">${option.letter}</div>
        <div class="option-text">${option.text}</div>
      `;
      
      optionItem.addEventListener('click', () => this.selectAnswer(option.letter, questionNumber));
      this.answerOptionsEl.appendChild(optionItem);
    });
  }

  selectAnswer(answer, questionNumber) {
    this.userAnswers[questionNumber] = answer;
    
    // Update visual selection
    const options = this.answerOptionsEl.querySelectorAll('.option-item');
    options.forEach((option, index) => {
      option.classList.remove('selected');
      if (index === ['A', 'B', 'C', 'D'].indexOf(answer)) {
        option.classList.add('selected');
      }
    });
    
    // Update question grid
    this.updateQuestionGrid(questionNumber);
  }

  updateQuestionGrid(questionNumber) {
    const questionItems = this.questionGrid.querySelectorAll('.question-item');
    
    questionItems.forEach((item, index) => {
      item.classList.remove('current', 'answered', 'unanswered');
      
      const itemNumber = index + 1;
      if (itemNumber === questionNumber) {
        item.classList.add('current');
      } else if (this.userAnswers[itemNumber]) {
        item.classList.add('answered');
      } else {
        item.classList.add('unanswered');
      }
    });
    
    // Update progress
    const answeredCount = Object.keys(this.userAnswers).length;
    const progress = (answeredCount / 98) * 100;
    this.progressFill.style.width = `${progress}%`;
  }

  updateModuleIndicator(module) {
    const moduleName = this.getModuleName(module);
    const moduleClass = module.startsWith('english') ? 'english' : 'math';
    
    this.moduleIndicator.innerHTML = `
      <span class="module-badge ${moduleClass}">${moduleName}</span>
    `;
  }

  getModuleName(module) {
    const moduleNames = {
      'english-1': 'English 1',
      'english-2': 'English 2',
      'math-1': 'Math 1',
      'math-2': 'Math 2'
    };
    return moduleNames[module] || module;
  }

  getQuestionTypeName(type) {
    const typeNames = {
      'multiple-choice': 'Multiple Choice',
      'fill-in-blank': 'Fill in the Blank',
      'essay': 'Essay'
    };
    return typeNames[type] || type;
  }

  updateNavigation(questionNumber) {
    this.prevBtn.disabled = questionNumber <= 1;
    this.nextBtn.disabled = questionNumber >= 98;
    
    if (questionNumber >= 98) {
      this.submitBtn.style.display = 'inline-flex';
      this.nextBtn.style.display = 'none';
    } else {
      this.submitBtn.style.display = 'none';
      this.nextBtn.style.display = 'inline-flex';
    }
  }

  async nextQuestion() {
    if (this.currentTest.currentQuestion < 98) {
      await this.submitAnswer();
      await this.loadQuestion(this.currentTest.currentQuestion + 1);
    }
  }

  async previousQuestion() {
    if (this.currentTest.currentQuestion > 1) {
      await this.submitAnswer();
      await this.loadQuestion(this.currentTest.currentQuestion - 1);
    }
  }

  async goToQuestion(questionNumber) {
    if (questionNumber >= 1 && questionNumber <= 98) {
      await this.submitAnswer();
      await this.loadQuestion(questionNumber);
    }
  }

  async submitAnswer() {
    if (!this.currentQuestion || !this.userAnswers[this.currentTest.currentQuestion]) {
      return;
    }

    try {
      const timeSpent = Math.round((Date.now() - this.questionStartTime) / 1000);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${this.API_BASE_URL}/practice-tests/answer/${this.currentTest._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answer: this.userAnswers[this.currentTest.currentQuestion],
          timeSpent: timeSpent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const data = await response.json();
      this.currentTest = data.test;
      
      if (data.isComplete) {
        this.completeTest();
      }
      
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }

  async submitTest() {
    if (confirm('Are you sure you want to submit your test? This action cannot be undone.')) {
      await this.submitAnswer();
      this.completeTest();
    }
  }

  async completeTest() {
    this.isTestActive = false;
    this.stopTimer();
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.API_BASE_URL}/practice-tests/results/${this.currentTest._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get results');
      }

      const data = await response.json();
      this.displayResults(data);
      
    } catch (error) {
      console.error('Error getting results:', error);
      alert('Failed to load results. Please try again.');
    }
  }

  displayResults(results) {
    const { test, estimatedScore, detailedResults } = results;
    
    // Update result elements
    this.overallScoreEl.textContent = `${detailedResults.overall.percentage}%`;
    this.englishScoreEl.textContent = `${detailedResults.english.percentage}%`;
    this.mathScoreEl.textContent = `${detailedResults.math.percentage}%`;
    this.timeTakenEl.textContent = `${test.totalTime} min`;
    this.questionsAnsweredEl.textContent = `${detailedResults.overall.total}/98`;
    this.estimatedScoreEl.textContent = estimatedScore;
    
    // Show results modal
    this.resultsModal.classList.add('active');
  }

  pauseTest() {
    if (!this.isTestActive) return;
    
    this.isTestActive = false;
    this.stopTimer();
    this.pauseModal.classList.add('active');
  }

  async resumeTest() {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.API_BASE_URL}/practice-tests/resume/${this.currentTest._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to resume test');
      }

      this.isTestActive = true;
      this.startTimer();
      this.pauseModal.classList.remove('active');
      
    } catch (error) {
      console.error('Error resuming test:', error);
      alert('Failed to resume test. Please try again.');
    }
  }

  exitTest() {
    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
      window.location.href = '/';
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.currentTest && this.currentTest.timeRemaining > 0) {
        this.currentTest.timeRemaining--;
        this.updateTimer();
        
        if (this.currentTest.timeRemaining <= 0) {
          this.completeTest();
        }
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimer() {
    const hours = Math.floor(this.currentTest.timeRemaining / 3600);
    const minutes = Math.floor((this.currentTest.timeRemaining % 3600) / 60);
    const seconds = this.currentTest.timeRemaining % 60;
    
    this.timeRemainingEl.textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  showLoading(show) {
    this.loadingOverlay.style.display = show ? 'flex' : 'none';
  }

  reviewAnswers() {
    // TODO: Implement answer review functionality
    alert('Answer review feature coming soon!');
  }

  startNewTest() {
    window.location.reload();
  }

  goHome() {
    window.location.href = '/';
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new PracticeTestApp();
});

// Prevent accidental navigation
window.addEventListener('beforeunload', (e) => {
  if (window.practiceTestApp && window.practiceTestApp.isTestActive) {
    e.preventDefault();
    e.returnValue = '';
  }
}); 