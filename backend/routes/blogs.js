const express = require('express')
const { body, validationResult } = require('express-validator')
const Blog = require('../models/Blog')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query
    const query = { isPublished: true }

    // Add tag filter
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] }
    }

    // Add search functionality
    if (search) {
      query.$text = { $search: search }
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content') // Exclude full content for list view

    const total = await Blog.countDocuments(query)

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    })
  }
})

// Get single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    })

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching blog'
    })
  }
})

// Get all blogs (admin only)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const query = {}

    if (status === 'published') {
      query.isPublished = true
    } else if (status === 'draft') {
      query.isPublished = false
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Blog.countDocuments(query)

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs'
    })
  }
})

// Create new blog (admin only)
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('slug').trim().isLength({ min: 1 }).withMessage('Slug is required'),
  body('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt is required and must be less than 500 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('featuredImage').isURL().withMessage('Featured image must be a valid URL'),
  body('readTime').isInt({ min: 1 }).withMessage('Read time must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const blog = new Blog(req.body)
    await blog.save()

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Blog with this slug already exists'
      })
    }
    
    console.error('Error creating blog:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating blog'
    })
  }
})

// Update blog (admin only)
router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  body('excerpt').optional().trim().isLength({ min: 1, max: 500 }),
  body('content').optional().trim().isLength({ min: 1 }),
  body('featuredImage').optional().isURL(),
  body('readTime').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      })
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    })
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating blog'
    })
  }
})

// Delete blog (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting blog'
    })
  }
})

module.exports = router
