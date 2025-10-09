const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads')
const imagesDir = path.join(uploadsDir, 'images')
const videosDir = path.join(uploadsDir, 'videos')

// Ensure directories exist
;[uploadsDir, imagesDir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, imagesDir)
    } else if (file.mimetype.startsWith('video/')) {
      cb(null, videosDir)
    } else {
      cb(null, uploadsDir)
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    const baseName = path.basename(file.originalname, extension)
    cb(null, `${baseName}-${uniqueSuffix}${extension}`)
  }
})

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = {
    'image/jpeg': true,
    'image/jpg': true,
    'image/png': true,
    'image/gif': true,
    'image/webp': true,
    'video/mp4': true,
    'video/avi': true,
    'video/mov': true,
    'video/wmv': true
  }

  if (allowedTypes[file.mimetype]) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 10 // Maximum 10 files per request
  },
  fileFilter: fileFilter
})

// Middleware for single file upload
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName)
    
    singleUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 50MB.'
          })
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: 'Too many files. Maximum 10 files allowed.'
          })
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        })
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      next()
    })
  }
}

// Middleware for multiple file upload
const uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    const multipleUpload = upload.array(fieldName, maxCount)
    
    multipleUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 50MB.'
          })
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({
            success: false,
            message: `Too many files. Maximum ${maxCount} files allowed.`
          })
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`
        })
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      next()
    })
  }
}

// Helper function to get file URL
const getFileUrl = (req, filename, type = 'images') => {
  const baseUrl = `${req.protocol}://${req.get('host')}`
  return `${baseUrl}/uploads/${type}/${filename}`
}

// Helper function to delete file
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting file:', error)
    return false
  }
}

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  getFileUrl,
  deleteFile
}
