const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    enum: ['math', 'reading', 'writing', 'comprehensive', 'practice-tests'],
    required: [true, 'Course category is required']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  duration: {
    type: Number, // in hours
    required: [true, 'Course duration is required'],
    min: [1, 'Duration must be at least 1 hour']
  },
  price: {
    type: Number,
    required: [true, 'Course price is required'],
    min: [0, 'Price cannot be negative']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  materials: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['video', 'pdf', 'quiz', 'practice-test'],
      required: true
    },
    url: {
      type: String,
      trim: true
    },
    duration: Number, // for videos in minutes
    description: String
  }],
  topics: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningOutcomes: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  maxStudents: {
    type: Number,
    default: 100
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  thumbnail: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  requirements: {
    minScore: {
      type: Number,
      min: 400,
      max: 1600
    },
    gradeLevel: [{
      type: String,
      enum: ['9th', '10th', '11th', '12th', 'college']
    }]
  }
}, {
  timestamps: true
});

// Virtual for enrollment status
courseSchema.virtual('isFull').get(function() {
  return this.enrollmentCount >= this.maxStudents;
});

// Virtual for course status
courseSchema.virtual('status').get(function() {
  if (!this.isPublished) return 'draft';
  if (this.isFull) return 'full';
  if (this.startDate && new Date() < this.startDate) return 'upcoming';
  if (this.endDate && new Date() > this.endDate) return 'completed';
  return 'active';
});

// Method to update rating
courseSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Indexes
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ isPublished: 1, isFeatured: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ 'rating.average': -1 });

// Ensure virtual fields are serialized
courseSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Course', courseSchema); 