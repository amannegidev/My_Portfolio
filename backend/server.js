const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
require('dotenv').config()

const app = express()

// Ensure Express respects X-Forwarded-* headers (needed for correct req.protocol on Render)
app.set('trust proxy', 1)

// Helper function to get correct backend URL for image serving
const getBackendUrl = (req) => {
  // In production on Render, use the FRONTEND_URL domain without /api
  if (process.env.NODE_ENV === 'production') {
    // Extract base URL from FRONTEND_URL or construct from headers
    const frontendUrl = process.env.FRONTEND_URL
    if (frontendUrl) {
      // Replace frontend domain with backend domain if they're different
      // Or use X-Forwarded-Proto and X-Forwarded-Host headers
      const proto = req.get('X-Forwarded-Proto') || req.protocol || 'https'
      const host = req.get('X-Forwarded-Host') || req.get('host')
      return `${proto}://${host}`
    }
  }
  return `${req.protocol}://${req.get('host')}`
}

// Store backend URL in req for use in routes
app.use((req, res, next) => {
  req.backendUrl = getBackendUrl(req)
  next()
})

// Import routes
const blogRoutes = require('./routes/blogs')
const projectRoutes = require('./routes/projects')
const contactRoutes = require('./routes/contact')
const authRoutes = require('./routes/auth')
const uploadRoutes = require('./routes/upload')

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d', // Cache images for 7 days
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.set('Access-Control-Allow-Headers', '*')
    res.set('Cache-Control', 'public, max-age=604800') // 7 days
  }
}))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Routes
app.use('/api/blogs', blogRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Portfolio API is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
