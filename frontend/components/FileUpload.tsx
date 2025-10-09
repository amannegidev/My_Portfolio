'use client'

import { useState, useRef } from 'react'
import { api } from '@/lib/api'
import { FaUpload, FaImage, FaVideo, FaTrash, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface FileUploadProps {
  type: 'image' | 'video' | 'multiple'
  onUploadComplete: (urls: string[]) => void
  existingFiles?: string[]
  maxFiles?: number
  className?: string
}

interface UploadedFile {
  url: string
  filename: string
  originalName: string
  size: number
  type: string
}

export default function FileUpload({ 
  type, 
  onUploadComplete, 
  existingFiles = [], 
  maxFiles = 5,
  className = '' 
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize with existing files
  useState(() => {
    if (existingFiles.length > 0) {
      const existingUploaded = existingFiles.map(url => ({
        url,
        filename: url.split('/').pop() || '',
        originalName: url.split('/').pop() || '',
        size: 0,
        type: 'existing'
      }))
      setUploadedFiles(existingUploaded)
    }
  })

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    
    // Check file limits
    if (type !== 'multiple' && fileArray.length > 1) {
      toast.error('Please select only one file')
      return
    }

    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`)
      return
    }

    // Validate file types
    const validTypes = type === 'video' 
      ? ['video/mp4', 'video/avi', 'video/mov', 'video/wmv']
      : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type))
    if (invalidFiles.length > 0) {
      toast.error(`Invalid file type. Allowed: ${validTypes.join(', ')}`)
      return
    }

    // Check file sizes (50MB limit)
    const oversizedFiles = fileArray.filter(file => file.size > 50 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast.error('File size must be less than 50MB')
      return
    }

    uploadFiles(fileArray)
  }

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)

    try {
      const uploadPromises = files.map(async (file) => {
        if (type === 'video') {
          return await api.uploadVideo(file)
        } else if (type === 'multiple') {
          return await api.uploadImage(file)
        } else {
          return await api.uploadImage(file)
        }
      })

      const results = await Promise.all(uploadPromises)
      
      const newFiles: UploadedFile[] = results.map(result => ({
        url: result.data.url,
        filename: result.data.filename,
        originalName: result.data.originalName,
        size: result.data.size,
        type: result.data.mimetype
      }))

      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      
      // Notify parent component
      onUploadComplete(updatedFiles.map(f => f.url))
      
      toast.success(`${files.length} file(s) uploaded successfully`)
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    onUploadComplete(updatedFiles.map(f => f.url))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={type === 'multiple'}
          accept={type === 'video' ? 'video/*' : 'image/*'}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin h-8 w-8 text-blue-500 mb-2" />
            <p className="text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {type === 'video' ? (
              <FaVideo className="h-8 w-8 text-gray-400 mb-2" />
            ) : (
              <FaImage className="h-8 w-8 text-gray-400 mb-2" />
            )}
            <p className="text-gray-600 mb-2">
              Drag and drop {type === 'multiple' ? 'files' : 'a file'} here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-500">
              {type === 'video' ? 'MP4, AVI, MOV, WMV' : 'JPG, PNG, GIF, WebP'} up to 50MB
              {type === 'multiple' && ` (max ${maxFiles} files)`}
            </p>
          </div>
        )}
      </div>

      {/* Uploaded Files Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-lg border"
              >
                {/* File Preview */}
                <div className="flex-shrink-0 mr-3">
                  {file.type.startsWith('video/') || file.type === 'existing' ? (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <FaVideo className="text-gray-500" />
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      alt={file.originalName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.originalName}
                  </p>
                  {file.size > 0 && (
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="flex-shrink-0 ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                  title="Remove file"
                >
                  <FaTrash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
