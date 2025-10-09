'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { api } from '@/lib/api'
import { Blog } from '@/types'
import { FaCalendar, FaClock, FaEye, FaArrowLeft, FaShare } from 'react-icons/fa'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function BlogDetail() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug as string)
    }
  }, [params.slug])

  const fetchBlog = async (slug: string) => {
    try {
      setIsLoading(true)
      const response = await api.getBlogBySlug(slug)
      
      if (response.success) {
        setBlog(response.data)
      } else {
        setError('Blog post not found')
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      setError('Failed to load blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  // Format content with basic markdown support
  const formatContent = (content: string) => {
    return content
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </Layout>
    )
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-300 mb-6">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
            <Link
              href="/blogs"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => router.back()}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blogs
            </button>
          </div>

          {/* Blog Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center">
                  <FaCalendar className="mr-2 text-yellow-500" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="mr-2 text-yellow-500" />
                  <span>{blog.readTime} min read</span>
                </div>
                
                <div className="flex items-center">
                  <FaEye className="mr-2 text-yellow-500" />
                  <span>{blog.views || 0} views</span>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              <div className="text-xl text-gray-300 leading-relaxed mb-8 p-6 bg-gray-800/30 rounded-xl border-l-4 border-yellow-500">
                {blog.excerpt}
              </div>
            </header>

            {/* Blog Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div 
                className="text-gray-200 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(blog.content) 
                }}
              />
            </div>

            {/* Author Info */}
            <footer className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center">
                <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold text-xl">
                    {blog.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{blog.author}</h3>
                  <p className="text-gray-400">Full Stack Developer</p>
                </div>
              </div>
            </footer>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <Link
                  href="/blogs"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  ← All Blogs
                </Link>
                
                <Link
                  href="/contact"
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Layout>
  )
}
