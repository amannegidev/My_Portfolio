'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { FaCalendar, FaClock, FaTag } from 'react-icons/fa'
import ContactSection from '@/components/ContactSection'

interface Blog {
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
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`)
        const data = await response.json()

        if (data.success) {
          setBlogs(data.data || [])
        } else {
          setBlogs([])
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen ">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="pt-12 lg:pt-20">
            <div className="container mx-auto  py-10">
              <div className="max-w-6xl mb-12">
                <h1 className="  gradient-text text-7xl mb-8 ">Blogs</h1>
                <p className="text-xl text-gray-300 leading-relaxed justified no-justify">
                  Thoughts, tutorials, and insights about web development, technology, and programming.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-white mb-4">No blog posts yet</h3>
              <p className="text-gray-400">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog._id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700/50">
                  {/* Featured Image */}
                  {<Link
                    href={`/blogs/${blog.slug}`}
                    className=""
                  >
                    <div className="h-48 bg-gray-700 overflow-hidden">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>}

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <FaCalendar className="mr-2" />
                      <span className="mr-4">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                      <FaClock className="mr-2" />
                      <span>{blog.readTime} min read</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 ">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs flex items-center"
                        >
                          <FaTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="text-gray-400 text-xs">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Read More */}
                    {/* <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                    >
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link> */}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection
        title="Have a Story to Share?"
        description="Whether you want to collaborate on content, have questions about my articles, or just want to connect - I'd love to hear from you!"
        buttonText="Get In Touch"
      />
    </Layout>
  )
}
