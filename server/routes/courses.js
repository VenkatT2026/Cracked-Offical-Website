const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, level, search, featured } = req.query;
    
    let query = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Course.countDocuments(query);
    
    res.json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCourses: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured courses
router.get('/featured', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true, isFeatured: true })
      .populate('instructor', 'firstName lastName email')
      .sort({ 'rating.average': -1 })
      .limit(6);
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new course (instructor/admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, level, duration, price, materials, topics, prerequisites, learningOutcomes, requirements } = req.body;
    
    // For now, we'll use a default instructor ID
    // In a real app, you'd get this from the authenticated user
    const defaultInstructor = await User.findOne({ role: 'instructor' });
    if (!defaultInstructor) {
      return res.status(400).json({ message: 'No instructor available' });
    }
    
    const course = new Course({
      title,
      description,
      category,
      level,
      duration,
      price,
      instructor: defaultInstructor._id,
      materials,
      topics,
      prerequisites,
      learningOutcomes,
      requirements
    });
    
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
});

// Update course
router.patch('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rate a course
router.post('/:id/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    await course.updateRating(rating);
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const courses = await Course.find({ 
      category: req.params.category, 
      isPublished: true 
    })
      .populate('instructor', 'firstName lastName email')
      .sort({ 'rating.average': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Course.countDocuments({ 
      category: req.params.category, 
      isPublished: true 
    });
    
    res.json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCourses: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });
    const featuredCourses = await Course.countDocuments({ isFeatured: true });
    
    // Get courses by category
    const categoryStats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get average rating
    const ratingStats = await Course.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating.average' },
          totalRatings: { $sum: '$rating.count' }
        }
      }
    ]);
    
    res.json({
      totalCourses,
      publishedCourses,
      featuredCourses,
      categoryStats,
      avgRating: ratingStats[0]?.avgRating || 0,
      totalRatings: ratingStats[0]?.totalRatings || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search courses
router.get('/search/query', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const query = {
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
        { topics: { $in: [new RegExp(q, 'i')] } }
      ]
    };
    
    const courses = await Course.find(query)
      .populate('instructor', 'firstName lastName email')
      .sort({ 'rating.average': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Course.countDocuments(query);
    
    res.json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCourses: count,
      searchQuery: q
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 