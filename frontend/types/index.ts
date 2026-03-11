// Blog types
export interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  tags: string[]
  publishedAt: string
  isPublished: boolean
  author: string
  readTime: number
  views: number
  likes: number
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Project types
export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  images: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

// Contact types
export interface Contact {
  _id: string
  name: string
  email: string
  message: string
  isRead: boolean
  replied: boolean
  replyMessage?: string
  repliedAt?: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
  updatedAt: string
}

// User types
export interface User {
  _id: string
  name: string
  email: string
  role: 'admin' | 'user'
  isActive: boolean
  lastLogin?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: any[]
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form types
export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface LoginForm {
  email: string
  password: string
}

export interface BlogForm {
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  tags: string[]
  isPublished: boolean
  readTime: number
}

export interface ProjectForm {
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  images: string[]
  featured: boolean
}
