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
  passage: {
    type: String // For reading comprehension questions
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
  },
  tags: [{
    type: String,
    trim: true
  }],
  topic: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0
  },
  averageTimeSpent: {
    type: Number, // in seconds
    default: 0
  },
  successRate: {
    type: Number, // percentage
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
questionSchema.index({ module: 1, questionNumber: 1 });
questionSchema.index({ module: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ isActive: 1 });

// Method to update usage statistics
questionSchema.methods.updateStats = function(timeSpent, isCorrect) {
  this.usageCount += 1;
  
  // Update average time spent
  const totalTime = this.averageTimeSpent * (this.usageCount - 1) + timeSpent;
  this.averageTimeSpent = Math.round(totalTime / this.usageCount);
  
  // Update success rate
  const correctCount = Math.round((this.successRate / 100) * (this.usageCount - 1));
  const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
  this.successRate = Math.round((newCorrectCount / this.usageCount) * 100);
  
  return this.save();
};

module.exports = mongoose.model('Question', questionSchema); 