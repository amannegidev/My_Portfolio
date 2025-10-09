const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// API client with error handling
class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    // Get token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
    }
  }

  removeToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Public API methods
  async getBlogs(params?: { page?: number; limit?: number; tag?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.tag) searchParams.append('tag', params.tag)
    if (params?.search) searchParams.append('search', params.search)

    const query = searchParams.toString()
    return this.request(`/blogs${query ? `?${query}` : ''}`)
  }

  async getBlogBySlug(slug: string) {
    return this.request(`/blogs/${slug}`)
  }

  async getProjects(params?: { page?: number; limit?: number; category?: string; featured?: boolean }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.category) searchParams.append('category', params.category)
    if (params?.featured) searchParams.append('featured', 'true')

    const query = searchParams.toString()
    return this.request(`/projects${query ? `?${query}` : ''}`)
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`)
  }

  async submitContact(data: { name: string; email: string; message: string }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.success && response.data.token) {
      this.setToken(response.data.token)
    }

    return response
  }

  async logout() {
    this.removeToken()
  }

  async getProfile() {
    return this.request('/auth/profile')
  }

  // Admin methods
  async createBlog(blogData: any) {
    return this.request('/blogs', {
      method: 'POST',
      body: JSON.stringify(blogData),
    })
  }

  async updateBlog(id: string, blogData: any) {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blogData),
    })
  }

  async deleteBlog(id: string) {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    })
  }

  async createProject(projectData: any) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    })
  }

  async updateProject(id: string, projectData: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    })
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    })
  }

  async getContacts(params?: { page?: number; limit?: number; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.status) searchParams.append('status', params.status)

    const query = searchParams.toString()
    return this.request(`/contact${query ? `?${query}` : ''}`)
  }

  // File upload methods
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(`${this.baseURL}/upload/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }
    return data
  }

  async uploadVideo(file: File) {
    const formData = new FormData()
    formData.append('video', file)

    const response = await fetch(`${this.baseURL}/upload/video`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }
    return data
  }

  async uploadMultipleImages(files: File[]) {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })

    const response = await fetch(`${this.baseURL}/upload/images`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }
    return data
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL)

// Export types
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
  createdAt: string
  updatedAt: string
}

export interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  images: string[]
  featured: boolean
  category: string
  completedAt: string
  status: 'Completed' | 'In Progress' | 'Planned'
  priority: number
  createdAt: string
  updatedAt: string
}

export interface Contact {
  _id: string
  name: string
  email: string
  message: string
  isRead: boolean
  replied: boolean
  replyMessage?: string
  repliedAt?: string
  createdAt: string
  updatedAt: string
}
