'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import {
  FaDownload,
  FaArrowRight,
  FaCalendar,
  FaClock,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import ContactSection from '@/components/ContactSection'

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishedAt: string
  readTime: number
  featured: boolean
}

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  images: string[]
  featured: boolean
}

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedContent()
  }, [])

  const fetchFeaturedContent = async () => {
    try {
      const projectsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`
      )
      const projectsData = await projectsRes.json()

      if (projectsData.success) {
        const featured = (projectsData.data || [])
          .filter((p: Project) => p.featured)
          .slice(0, 2)
        setFeaturedProjects(featured)
      }

      const blogsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`
      )
      const blogsData = await blogsRes.json()

      if (blogsData.success) {
        const featured = (blogsData.data || [])
          .filter((b: Blog) => b.featured)
          .slice(0, 3)
        setFeaturedBlogs(featured)
      }
    } catch (error) {
      console.error('Error fetching featured content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 py-14 sm:py-20 lg:py-28">

            {/* ── Text side ── */}
            <div className="w-full lg:w-[58%] text-center lg:text-left">
              {/* Eyebrow label */}
              <span className="inline-flex items-center gap-2 text-yellow-500 text-sm font-mono tracking-widest uppercase mb-5">
                <span className="block w-6 h-px bg-yellow-500" />
                Fullstack Developer · Indie Maker
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold leading-[1.18] tracking-tight text-white mb-6">
                I'm{' '}
                <span className="text-yellow-400">Aman Negi</span>
                {', '}a fullstack developer, indie maker, and tech explorer living on the internet.
              </h1>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                I design, develop, and explore the ever-evolving world of web
                technologies — creating functional and user-friendly digital
                experiences.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/resume.pdf"
                  className="resume-btn inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-yellow-500 text-black font-semibold text-base hover:bg-yellow-400 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume <FaDownload className="text-sm" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium text-base hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                >
                  View Projects <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>

            {/* ── Image side ── */}
            <div className="w-full sm:w-80 lg:w-[38%] flex-shrink-0">
              <div className="relative w-full max-w-xs sm:max-w-sm mx-auto">
                {/* Decorative offset shadow */}
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30"
                />

                {/* Terminal card */}
                <div className="relative rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-hidden">
                  {/* Traffic-light header */}
                  <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2.5 border-b border-gray-700/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-gray-500 text-xs font-mono">developer.js</span>
                    <span className="w-14" />
                  </div>

                  {/* Photo */}
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/images/hero/hero-image.jpg"
                      alt="Aman Negi – Full Stack Developer"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Featured Projects ────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-20 sm:py-24 border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="block text-yellow-500 text-xs font-mono tracking-widest uppercase mb-2">
                  Portfolio
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Featured <span className="text-yellow-400">Projects</span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="self-start sm:self-auto inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors whitespace-nowrap"
              >
                View all projects <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Project grid */}
            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {featuredProjects.map((project) => (
                <article
                  key={project._id}
                  className="group flex flex-col rounded-xl border border-gray-700 hover:border-yellow-500/60 bg-gray-900 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5"
                >
                  {/* Image */}
                  <div className="relative h-52 sm:h-56 bg-gray-800 flex-shrink-0 overflow-hidden">
                    {project.images?.[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

                    <span className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase">
                      Featured
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded bg-gray-800 text-gray-400 border border-gray-700 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[11px] px-2.5 py-1 rounded bg-gray-800 text-gray-500 border border-gray-700 font-mono">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5 pt-2 border-t border-gray-800">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                        >
                          <FaExternalLinkAlt className="text-xs" /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white font-medium transition-colors"
                        >
                          <FaGithub className="text-sm" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─── Featured Blog Posts ──────────────────────────────── */}
      {featuredBlogs.length > 0 && (
        <section className="py-20 sm:py-24 border-t border-gray-800 bg-gray-900/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="block text-yellow-500 text-xs font-mono tracking-widest uppercase mb-2">
                  Writing
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Featured <span className="text-yellow-400">Blog Posts</span>
                </h2>
              </div>
              <Link
                href="/blogs"
                className="self-start sm:self-auto inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors whitespace-nowrap"
              >
                View all posts <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Blog grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group flex flex-col rounded-xl border border-gray-700 hover:border-yellow-500/50 bg-gray-900 overflow-hidden transition-colors duration-300"
                >
                  {/* Image */}
                  <div className="h-44 bg-gray-800 flex-shrink-0 overflow-hidden">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendar className="text-[10px]" />
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <FaClock className="text-[10px]" />
                        {blog.readTime} min read
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white leading-snug line-clamp-2 flex-1">
                      {blog.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors mt-1 group/link"
                    >
                      Read More
                      <FaArrowRight className="text-xs transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ─── Contact ─────────────────────────────────────────── */}
      <ContactSection
        description="Turn your ideas into reality with expert development and seamless solutions. Let's build something amazing together!"
        buttonText="Get In Touch"
      />

    </Layout>
  )
}