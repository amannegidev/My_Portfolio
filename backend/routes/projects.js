const express = require('express')
const { body, validationResult } = require('express-validator')
const Project = require('../models/Project')
const auth = require('../middleware/auth')
const router = express.Router()

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, featured, technology } = req.query
    const query = {}

    // Add featured filter
    if (featured === 'true') {
      query.featured = true
    }

    // Add technology filter
    if (technology) {
      query.technologies = { $in: [technology] }
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Project.countDocuments(query)

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    })
  }
})

// Get single project by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching project'
    })
  }
})

// Get project categories (public)
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category')
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    })
  }
})

// Get project technologies (public)
router.get('/meta/technologies', async (req, res) => {
  try {
    const technologies = await Project.distinct('technologies')
    res.json({
      success: true,
      data: technologies
    })
  } catch (error) {
    console.error('Error fetching technologies:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching technologies'
    })
  }
})

// Create new project (admin only)
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description is required and must be less than 1000 characters'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required')
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

    const project = new Project(req.body)
    await project.save()

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    })
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating project'
    })
  }
})

// Update project (admin only)
router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1, max: 200 }),
  body('description').optional().trim().isLength({ min: 1, max: 1000 }),
  body('technologies').optional().isArray({ min: 1 }),
  body('images').optional().isArray({ min: 1 })
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

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    })
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating project'
    })
  }
})

// Delete project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting project'
    })
  }
})

module.exports = router
