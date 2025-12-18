'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { FaDownload, FaArrowRight, FaCalendar, FaClock, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
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
      // Fetch featured projects
      const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`)
      const projectsData = await projectsRes.json()
      
      if (projectsData.success) {
        // Filter only featured projects and take top 2
        const featured = (projectsData.data || [])
          .filter((p: Project) => p.featured)
          .slice(0, 2)
        setFeaturedProjects(featured)
      }

      // Fetch featured blogs
      const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`)
      const blogsData = await blogsRes.json()
      
      if (blogsData.success) {
        // Filter only featured blogs and take top 3
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
      {/* Hero Section */}
      <section className="hero py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="w-full lg:w-4/12">
              <div className="relative w-full aspect-square max-w-md mx-auto group">
                {/* Terminal/Code Editor Container */}
                <div className="relative w-full h-full bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-gray-400 text-xs font-mono">developer.js</div>
                  </div>
                  
                  {/* Image Content */}
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/hero/hero-image.jpg"
                      alt="Aman Negi - Full Stack Developer"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 py-4 md-py-12 lg:py-0">
              <h1 className="text-4xl lg:text-4xl xl:text-4xl mb-6 leading-">
                I'm Aman Negi, a fullstack developer, Indie maker, and tech explorer living on the internet.
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                "I design, develop, and explore the ever-evolving world of web technologies, creating functional and user-friendly digital experiences.
              </p>
              <Link 
                href="/resume.pdf" 
                className="inline-flex items-center gap-3 text-xl yellow-text hover:text-yellow-300 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <FaDownload className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured <span className="text-yellow-500">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Showcasing my best work and most impactful projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <div key={project._id} className="group relative overflow-hidden rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-64 bg-gray-800">
                    {project.images && project.images[0] ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-600">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FaGithub /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                View All Projects <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Blog Posts */}
      {featuredBlogs.length > 0 && (
        <section className="py-16 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured <span className="text-yellow-500">Blog Posts</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My best articles and tutorials about web development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <article key={blog._id} className="bg-gray-800/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  {/* Blog Image */}
                  <div className="h-48 bg-gray-700 overflow-hidden">
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <FaCalendar className="mr-2" />
                      <span className="mr-4">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                      <FaClock className="mr-2" />
                      <span>{blog.readTime} min</span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                View All Posts <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <ContactSection 
        description="Turn your ideas into reality with expert development and seamless solutions. Let’s build something amazing together!"
        buttonText="Get In Touch"
      />
    </Layout>
  )
}
