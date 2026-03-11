'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { api } from '@/lib/api'
import { Blog } from '@/types'
import { FaCalendar, FaClock, FaEye, FaArrowLeft, FaShare, FaArrowRight } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatContent(content: string) {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-yellow-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
}

export default function BlogDetail() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [otherBlogs, setOtherBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) fetchBlog(params.slug as string)
  }, [params.slug])

  const fetchBlog = async (slug: string) => {
    try {
      setIsLoading(true)
      const response = await api.getBlogBySlug(slug)
      if (response.success) {
        setBlog(response.data)
        fetchOtherBlogs(slug)
      } else {
        setError('Blog post not found')
      }
    } catch {
      setError('Failed to load blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOtherBlogs = async (currentSlug: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`
      )
      const data = await res.json()
      if (data.success) {
        const others = (data.data as Blog[])
          .filter((b) => b.slug !== currentSlug)
          .slice(0, 3)
        setOtherBlogs(others)
      }
    } catch {
      // silently fail — other blogs are non-critical
    }
  }

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({ title: blog.title, text: blog.excerpt, url: window.location.href })
        return
      } catch {}
    }
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied!')
  }

  // Loading
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
        </div>
      </Layout>
    )
  }

  // Error
  if (error || !blog) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-5 px-4">
          <span className="text-gray-600 text-5xl">✦</span>
          <h1 className="text-3xl font-bold text-white">Post Not Found</h1>
          <p className="text-gray-400 max-w-sm">{error || "The blog post you're looking for doesn't exist."}</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-gray-950 font-bold text-sm hover:bg-yellow-300 transition-colors"
          >
            <FaArrowLeft className="text-xs" /> Back to Blog
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-14 sm:py-16 lg:py-24">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200 mb-10 group"
        >
          <FaArrowLeft className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Blog
        </button>

        <article>

          {/* Header */}
          <header className="mb-10">

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-8">
              <span className="inline-flex items-center gap-1.5">
                <FaCalendar className="text-yellow-500 text-[10px]" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaClock className="text-yellow-500 text-[10px]" />
                {blog.readTime} min read
              </span>
              {blog.views !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <FaEye className="text-yellow-500 text-[10px]" />
                  {blog.views} views
                </span>
              )}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-yellow-400 transition-colors duration-200"
              >
                <FaShare className="text-[10px]" />
                Share
              </button>
            </div>

            {/* Featured image */}
            {blog.featuredImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-gray-800">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Pull quote */}
            <div className="relative pl-5 border-l-2 border-yellow-500 py-1">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed italic">
                {blog.excerpt}
              </p>
            </div>

          </header>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-10" />

          {/* Content */}
          <div
            className="text-gray-300 text-base sm:text-lg leading-relaxed space-y-5
              [&_strong]:text-white [&_strong]:font-semibold
              [&_em]:text-gray-400
              [&_code]:bg-gray-800 [&_code]:text-yellow-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
          />

          {/* Divider */}
          <div className="h-px bg-gray-800 mt-14 mb-10" />

          {/* Author + share footer */}
          <footer className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_16px_rgba(250,204,21,0.3)]">
              <span className="text-gray-950 font-bold text-lg leading-none">
                {blog.author?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{blog.author}</p>
              <p className="text-gray-500 text-xs">Full Stack Developer</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 text-xs hover:border-yellow-500/50 hover:text-yellow-400 transition-colors duration-200"
              >
                <FaShare className="text-[10px]" /> Share post
              </button>
            </div>
          </footer>

         

        </article>
      </div>

      {/* Other blogs section */}
      {otherBlogs.length > 0 && (
        <section className="border-t border-gray-800 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

            {/* Section header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="block text-yellow-500 text-xs font-mono tracking-widest uppercase mb-2">
                  Keep Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Other Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
              >
                View all <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Desktop grid — same as blogs page */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {otherBlogs.map((other, i) => (
                <Link
                  key={other._id}
                  href={`/blogs/${other.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-700 bg-gray-900/40 hover:border-yellow-500/50 overflow-hidden transition-colors duration-300"
                >
                  <div className="relative h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                    {other.featuredImage ? (
                      <Image
                        src={other.featuredImage}
                        alt={other.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-600 text-xs font-mono">no image</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[10px] font-mono text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
                      {String(i + 1).padStart(3, '0')}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendar className="text-[9px]" />
                        {formatDate(other.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FaClock className="text-[9px]" />
                        {other.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2 flex-1">
                      {other.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {other.excerpt}
                    </p>
                    {other.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {other.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono">
                            {tag}
                          </span>
                        ))}
                        {other.tags.length > 3 && (
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-gray-800 text-gray-500 font-mono">
                            +{other.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile list — same horizontal layout as blogs page */}
            <div className="sm:hidden py-2 px-1">
              {otherBlogs.map((other, i) => (
                <Link
                  key={other._id}
                  href={`/blogs/${other.slug}`}
                  className="group flex gap-4 items-stretch border-b border-gray-800 last:border-b-0 py-5 first:pt-0"
                >
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-mono text-gray-600">
                      {String(i + 1).padStart(3, '0')}
                    </span>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                      {other.featuredImage ? (
                        <Image
                          src={other.featuredImage}
                          alt={other.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-800" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0 justify-center">
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <FaCalendar className="text-[8px]" />
                        {formatDate(other.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <FaClock className="text-[8px]" />
                        {other.readTime} min
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                      {other.title}
                    </h3>
                    {other.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {other.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                 
                  </div>
                </Link>
              ))}

              <div className="mt-6 text-center">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  View all articles <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>

          </div>
        </section>
      )}

    </Layout>
  )
}