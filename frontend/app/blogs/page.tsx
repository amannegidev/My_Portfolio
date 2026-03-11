'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa'
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Desktop card — standard grid card
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col rounded-xl border border-gray-700 bg-gray-900/40 hover:border-yellow-500/50 overflow-hidden transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-800 overflow-hidden flex-shrink-0">
        {blog.featuredImage ? (
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-600 text-xs font-mono">no image</span>
          </div>
        )}
        {/* Index badge */}
        <span className="absolute top-3 left-3 text-[10px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
          {String(index + 1).padStart(3, '0')}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <FaCalendar className="text-[9px]" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="text-[9px]" />
            {blog.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-white leading-snug line-clamp-2 flex-1">
          {blog.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono">
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-800 text-gray-500 font-mono">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Read more */}
        {/* <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors mt-1">
          Read Article
          <FaArrowRight className="text-[9px] transition-transform duration-200 group-hover:translate-x-0.5" />
        </div> */}
      </div>
    </Link>
  )
}

// Mobile card — horizontal layout with left image strip
function MobileBlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex gap-4 items-stretch border-b border-gray-800 last:border-b-0 py-5 first:pt-0"
    >
      {/* Left: index + image stacked */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <span className="text-[10px] font-mono text-gray-600">
          {String(index + 1).padStart(3, '0')}
        </span>
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
          {blog.featuredImage ? (
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
        </div>
      </div>

      {/* Right: content */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0 justify-center">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          <span className="inline-flex items-center gap-1">
            <FaCalendar className="text-[8px]" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <FaClock className="text-[8px]" />
            {blog.readTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold text-white leading-snug line-clamp-2">
          {blog.title}
        </h2>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read more */}
        {/* <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors">
          Read <FaArrowRight className="text-[8px]" />
        </span> */}
      </div>
    </Link>
  )
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`
        )
        const data = await response.json()
        if (data.success) setBlogs(data.data || [])
      } catch (err) {
        console.error('Error fetching blogs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Page header */}
        <div className="pt-14 sm:pt-16 lg:pt-24 pb-10 lg:pb-14 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl gradient-text leading-none mb-8">
                Blogs
              </h1>
              {!loading && blogs.length > 0 && (
                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
                  {blogs.length} article{blogs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed">
              Thoughts, tutorials, and insights about web development, technology, and programming.
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && blogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-3">
            <span className="text-gray-600 text-4xl">✦</span>
            <p className="text-gray-500 text-base">No posts yet. Check back soon!</p>
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <>
            {/* Desktop grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 py-12">
              {blogs.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>

            {/* Mobile list */}
            <div className="sm:hidden py-6 px-1">
              {blogs.map((blog, i) => (
                <MobileBlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>
          </>
        )}

      </div>

      <ContactSection
        title="Have a Story to Share?"
        description="Whether you want to collaborate on content, have questions about my articles, or just want to connect — I'd love to hear from you!"
        buttonText="Get In Touch"
      />
    </Layout>
  )
}