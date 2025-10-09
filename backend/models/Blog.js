const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  publishedAt: {
    type: Date,
    default: null
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    required: true,
    default: 'Aman Negi'
  },
  readTime: {
    type: Number,
    required: true,
    min: 1
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', tags: 'text' })
blogSchema.index({ isPublished: 1, publishedAt: -1 })
blogSchema.index({ slug: 1 })

// Virtual for formatted publish date
blogSchema.virtual('formattedPublishDate').get(function() {
  return this.publishedAt ? this.publishedAt.toLocaleDateString() : null
})

// Pre-save middleware to set publishedAt when publishing
blogSchema.pre('save', function(next) {
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

module.exports = mongoose.model('Blog', blogSchema)
