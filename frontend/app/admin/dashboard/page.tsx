'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { api } from '@/lib/api'
import { FaBlog, FaProjectDiagram, FaEnvelope, FaEye, FaPlus } from 'react-icons/fa'
import Link from 'next/link'

interface DashboardStats {
  totalBlogs: number
  publishedBlogs: number
  totalProjects: number
  featuredProjects: number
  totalMessages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    featuredProjects: 0,
    totalMessages: 0,
    unreadMessages: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Fetch blogs stats
      const blogsResponse = await api.getBlogs({ limit: 1000 })
      const blogs = blogsResponse.data || []
      
      // Fetch projects stats
      const projectsResponse = await api.getProjects({ limit: 1000 })
      const projects = projectsResponse.data || []
      
      // Fetch messages stats
      const messagesResponse = await api.getContacts({ limit: 1000 })
      const messages = messagesResponse.data || []

      setStats({
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((blog: any) => blog.isPublished).length,
        totalProjects: projects.length,
        featuredProjects: projects.filter((project: any) => project.featured).length,
        totalMessages: messages.length,
        unreadMessages: messages.filter((message: any) => !message.isRead).length
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      subtitle: `${stats.publishedBlogs} published`,
      icon: FaBlog,
      color: 'bg-blue-500',
      href: '/admin/blogs'
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      subtitle: `${stats.featuredProjects} featured`,
      icon: FaProjectDiagram,
      color: 'bg-green-500',
      href: '/admin/projects'
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      subtitle: `${stats.unreadMessages} unread`,
      icon: FaEnvelope,
      color: 'bg-purple-500',
      href: '/admin/messages'
    }
  ]

  const quickActions = [
    {
      title: 'New Blog Post',
      description: 'Create a new blog post',
      icon: FaBlog,
      href: '/admin/blogs/new',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'New Project',
      description: 'Add a new project',
      icon: FaProjectDiagram,
      href: '/admin/projects/new',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'View Portfolio',
      description: 'See your live portfolio',
      icon: FaEye,
      href: '/',
      color: 'bg-yellow-600 hover:bg-yellow-700'
    }
  ]

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
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard!</h1>
          <p className="text-gray-600">Manage your portfolio content and track your progress.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className={`${action.color} text-white p-4 rounded-lg transition-colors cursor-pointer`}>
                  <div className="flex items-center mb-2">
                    <action.icon className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">{action.title}</h3>
                  </div>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-blue-50 rounded-lg">
              <FaBlog className="h-5 w-5 text-blue-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Create Your First Blog Post</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Share your thoughts and expertise with your audience by creating engaging blog posts.
                </p>
                <Link href="/admin/blogs/new" className="text-blue-600 text-sm font-medium hover:underline">
                  Create Blog Post →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <FaProjectDiagram className="h-5 w-5 text-green-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Add Your Projects</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Showcase your work by adding projects with descriptions, technologies, and links.
                </p>
                <Link href="/admin/projects/new" className="text-green-600 text-sm font-medium hover:underline">
                  Add Project →
                </Link>
              </div>
            </div>
            
            <div className="flex items-start p-4 bg-purple-50 rounded-lg">
              <FaEnvelope className="h-5 w-5 text-purple-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-gray-900">Check Messages</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Stay connected with your audience by responding to contact messages.
                </p>
                <Link href="/admin/messages" className="text-purple-600 text-sm font-medium hover:underline">
                  View Messages →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
