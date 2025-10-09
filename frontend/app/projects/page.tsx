'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout'
import Link from 'next/link'
import ContactSection from '@/components/ContactSection'

interface Project {
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`)
        const data = await response.json()
        
        if (data.success) {
          setProjects(data.data || [])
        } else {
          setProjects([])
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-portfolio-yellow mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading projects...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Projects Header */}
      <section className="pt-12 lg:pt-20 ">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-6xl mb-12">
            <h1 className="text-7xl  gradient-text  mb-8">Projects</h1>
            <p className="text-xl text-gray-300 leading-relaxed justified no-justify">
              I have worked on a variety of front-end and full-stack projects, focusing on building visually appealing, high-performance, and user-friendly applications. From intuitive UI/UX design to robust backend architecture, each project is crafted with scalability, responsiveness, and efficiency in mind. Leveraging modern technologies, I ensure smooth interactions, fast load times, and seamless functionality for a flawless user experience.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="group relative overflow-hidden rounded-lg border border-gray-700 hover:border-portfolio-yellow transition-all duration-300">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src={project.images && project.images.length > 0 ? project.images[0] : 'https://via.placeholder.com/800x600/1f2937/f59e0b?text=No+Image'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold yellow-text mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-portfolio-yellow/20 text-portfolio-yellow text-sm rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-portfolio-yellow text-black rounded hover:bg-yellow-400 transition-colors duration-300"
                        >
                          Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-gray-600 text-white rounded hover:border-portfolio-yellow transition-colors duration-300"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  )
}
