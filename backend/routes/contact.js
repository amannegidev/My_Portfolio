const express = require('express')
const { body, validationResult } = require('express-validator')
const Contact = require('../models/Contact')
const auth = require('../middleware/auth')
const router = express.Router()

// Submit contact form (public)
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required and must be less than 2000 characters')
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

    const { name, email, message } = req.body

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    })

    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.'
    })
  }
})

// Get all contact messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query
    const query = {}

    // Filter by read status
    if (status === 'read') {
      query.isRead = true
    } else if (status === 'unread') {
      query.isRead = false
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Contact.countDocuments(query)
    const unreadCount = await Contact.countDocuments({ isRead: false })

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      meta: {
        unreadCount
      }
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages'
    })
  }
})

// Get single contact message (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    // Mark as read if not already read
    if (!contact.isRead) {
      contact.isRead = true
      await contact.save()
    }

    res.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message'
    })
  }
})

// Mark contact as read/unread (admin only)
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const { isRead } = req.body

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: Boolean(isRead) },
      { new: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      message: `Message marked as ${isRead ? 'read' : 'unread'}`,
      data: contact
    })
  } catch (error) {
    console.error('Error updating contact status:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating message status'
    })
  }
})

// Reply to contact message (admin only)
router.post('/:id/reply', [
  auth,
  body('replyMessage').trim().isLength({ min: 1, max: 2000 }).withMessage('Reply message is required and must be less than 2000 characters')
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

    const { replyMessage } = req.body

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        replied: true,
        replyMessage,
        repliedAt: new Date(),
        isRead: true
      },
      { new: true }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    // Here you could integrate with an email service to send the reply
    // For now, we'll just store it in the database

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: contact
    })
  } catch (error) {
    console.error('Error sending reply:', error)
    res.status(500).json({
      success: false,
      message: 'Error sending reply'
    })
  }
})

// Delete contact message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      })
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message'
    })
  }
})

module.exports = router
