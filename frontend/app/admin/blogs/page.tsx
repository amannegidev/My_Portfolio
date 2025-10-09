'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'
import { Blog } from '@/types'
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSearch, FaStar } from 'react-icons/fa'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await api.getBlogs({ limit: 100 })
      if (response.success) {
        setBlogs(response.data || [])
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      toast.error('Failed to fetch blogs')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const response = await api.deleteBlog(id)
      if (response.success) {
        setBlogs(blogs.filter(blog => blog._id !== id))
        toast.success('Blog post deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Failed to delete blog post')
    }
  }

  const togglePublishStatus = async (blog: Blog) => {
    try {
      const response = await api.updateBlog(blog._id, {
        ...blog,
        isPublished: !blog.isPublished
      })
      
      if (response.success) {
        setBlogs(blogs.map(b => 
          b._id === blog._id 
            ? { ...b, isPublished: !b.isPublished }
            : b
        ))
        toast.success(`Blog ${!blog.isPublished ? 'published' : 'unpublished'} successfully`)
      }
    } catch (error) {
      console.error('Error updating blog status:', error)
      toast.error('Failed to update blog status')
    }
  }

  const toggleFeaturedStatus = async (blog: Blog) => {
    try {
      const response = await api.updateBlog(blog._id, {
        ...blog,
        featured: !blog.featured
      })
      
      if (response.success) {
        setBlogs(blogs.map(b => 
          b._id === blog._id 
            ? { ...b, featured: !b.featured }
            : b
        ))
        toast.success(`Blog ${!blog.featured ? 'featured' : 'unfeatured'} successfully`)
      }
    } catch (error) {
      console.error('Error updating featured status:', error)
      toast.error('Failed to update featured status')
    }
  }

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'published' && blog.isPublished) ||
                         (filterStatus === 'draft' && !blog.isPublished)
    
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600">Create and manage your blog posts</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <FaPlus className="mr-2" />
            New Blog Post
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <FaEdit className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
              <Link
                href="/admin/blogs/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center transition-colors"
              >
                <FaPlus className="mr-2" />
                Create Blog Post
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Published Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={blog.featuredImage || '/api/placeholder/48/48'}
                              alt={blog.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">
                              {blog.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {blog.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            blog.isPublished
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.views || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleFeaturedStatus(blog)}
                            className={`p-2 rounded-lg transition-colors ${
                              blog.featured
                                ? 'text-yellow-500 hover:bg-yellow-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            }`}
                            title={blog.featured ? 'Unfeature' : 'Feature'}
                          >
                            <FaStar className={blog.featured ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => togglePublishStatus(blog)}
                            className={`p-2 rounded-lg transition-colors ${
                              blog.isPublished
                                ? 'text-green-600 hover:bg-green-50'
                                : 'text-gray-400 hover:bg-gray-50'
                            }`}
                            title={blog.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {blog.isPublished ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <Link
                            href={`/admin/blogs/edit/${blog._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
