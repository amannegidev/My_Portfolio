const express = require('express')
const { uploadSingle, uploadMultiple, getFileUrl } = require('../middleware/upload')
const auth = require('../middleware/auth')
const router = express.Router()

// Upload single image
router.post('/image', [auth, uploadSingle('image')], (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const fileUrl = getFileUrl(req, req.file.filename, 'images')
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    })
  }
})

// Upload single video
router.post('/video', [auth, uploadSingle('video')], (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const fileUrl = getFileUrl(req, req.file.filename, 'videos')
    
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    })
  } catch (error) {
    console.error('Error uploading video:', error)
    res.status(500).json({
      success: false,
      message: 'Error uploading video'
    })
  }
})

// Upload multiple images
router.post('/images', [auth, uploadMultiple('images', 5)], (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: getFileUrl(req, file.filename, file.mimetype.startsWith('video/') ? 'videos' : 'images')
    }))
    
    res.json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
      data: uploadedFiles
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    res.status(500).json({
      success: false,
      message: 'Error uploading files'
    })
  }
})

// Get file info (for admin use)
router.get('/info/:filename', auth, (req, res) => {
  try {
    const { filename } = req.params
    const fs = require('fs')
    const path = require('path')
    
    // Check in images directory
    const imagePath = path.join(__dirname, '..', 'uploads', 'images', filename)
    const videoPath = path.join(__dirname, '..', 'uploads', 'videos', filename)
    
    let filePath, type
    if (fs.existsSync(imagePath)) {
      filePath = imagePath
      type = 'images'
    } else if (fs.existsSync(videoPath)) {
      filePath = videoPath
      type = 'videos'
    } else {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      })
    }
    
    const stats = fs.statSync(filePath)
    const fileUrl = getFileUrl(req, filename, type)
    
    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        type,
        url: fileUrl
      }
    })
  } catch (error) {
    console.error('Error getting file info:', error)
    res.status(500).json({
      success: false,
      message: 'Error getting file info'
    })
  }
})

module.exports = router
