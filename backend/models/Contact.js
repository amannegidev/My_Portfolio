const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message: 'Please enter a valid email address'
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  isRead: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  replyMessage: {
    type: String,
    trim: true
  },
  repliedAt: {
    type: Date
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
})

// Index for better performance
contactSchema.index({ createdAt: -1 })
contactSchema.index({ isRead: 1 })
contactSchema.index({ email: 1 })

module.exports = mongoose.model('Contact', contactSchema)
