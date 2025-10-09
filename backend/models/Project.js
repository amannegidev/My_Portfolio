const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  liveUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v)
      },
      message: 'Live URL must be a valid HTTP/HTTPS URL'
    }
  },
  githubUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v)
      },
      message: 'GitHub URL must be a valid GitHub repository URL'
    }
  },
  images: [{
    type: String,
    required: true
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better performance
projectSchema.index({ featured: -1, createdAt: -1 })
projectSchema.index({ technologies: 1 })

// Virtual for primary image
projectSchema.virtual('primaryImage').get(function() {
  return this.images && this.images.length > 0 ? this.images[0] : null
})

module.exports = mongoose.model('Project', projectSchema)
