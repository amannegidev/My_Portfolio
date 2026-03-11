'use client'

import { useState, useRef, useEffect } from 'react'
import Layout from '@/components/Layout'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import ContactSection from '@/components/ContactSection'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  images: string[]
  featured: boolean
}

// Desktop Project Block
function ProjectBlock({ project, index }: { project: Project; index: number }) {
  return (
    <div className="border-b border-gray-800 last:border-b-0 py-14 lg:py-16">
      <div className="flex flex-col gap-8">

        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <span className="block text-gray-600 text-xs font-mono tracking-widest mb-2">
              ({String(index + 1).padStart(3, '0')})
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-gray-700 text-gray-400 font-mono">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          {project.liveUrl && (
            <div className="hidden sm:flex flex-shrink-0 pt-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 text-gray-950 text-sm font-bold hover:bg-yellow-300 transition-colors duration-200 shadow-[0_0_16px_rgba(250,204,21,0.25)] hover:shadow-[0_0_24px_rgba(250,204,21,0.45)]"
              >
                <FaExternalLinkAlt className="text-xs" /> Live Demo
              </a>
            </div>
          )}
        </div>

        {project.images?.length > 0 && (
          <div className="grid grid-cols-4 gap-3 h-56 lg:h-72">
            {project.images.slice(0, 4).map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}>
                <Image
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {project.liveUrl && (
          <div className="flex sm:hidden">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-yellow-400 text-gray-950 text-sm font-bold shadow-[0_0_14px_rgba(250,204,21,0.3)]"
            >
              <FaExternalLinkAlt className="text-xs" /> Live Demo
            </a>
          </div>
        )}

      </div>
    </div>
  )
}

// Auto-cycling background images for a carousel slide
function CyclingBackground({ images, title }: { images: string[]; title: string }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${title} ${i + 1}`}
          fill
          className="object-cover transition-opacity duration-1000"
          style={{ opacity: i === activeImg ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
      {/* Small image indicator dots top-right */}
      {images.length > 1 && (
        <div className="absolute top-5 right-5 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`block h-1 rounded-full transition-all duration-500 ${
                i === activeImg ? 'w-4 bg-yellow-400' : 'w-1 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/10" />
    </>
  )
}

// Mobile Glass Carousel
function MobileCarousel({ projects }: { projects: Project[] }) {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const isDragging = useRef(false)

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(projects.length - 1, index)))
  }

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
      trackRef.current.style.transform = `translateX(${-current * 100}%)`
    }
  }, [current])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    isDragging.current = true
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(${-current * 100}% + ${touchDeltaX.current}px))`
    }
  }

  const onTouchEnd = () => {
    isDragging.current = false
    if (touchDeltaX.current < -60) goTo(current + 1)
    else if (touchDeltaX.current > 60) goTo(current - 1)
    else goTo(current)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Slider viewport */}
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className="flex"
          style={{ willChange: 'transform' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {projects.map((project, i) => (
            <div
              key={project._id}
              className="relative flex-shrink-0 w-full rounded-2xl overflow-hidden border border-white/10"
              style={{ minHeight: '78vh' }}
            >
              {/* Auto-cycling background */}
              <div className="absolute inset-0">
                {project.images?.length > 0 ? (
                  <CyclingBackground images={project.images} title={project.title} />
                ) : (
                  <div className="w-full h-full bg-gray-900" />
                )}
              </div>

              {/* Counter */}
              <div className="absolute top-5 left-5 z-10">
                <span className="text-white/40 text-xs font-mono tracking-widest">
                  {String(i + 1).padStart(3, '0')} / {String(projects.length).padStart(3, '0')}
                </span>
              </div>

              {/* Glass content panel */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-4">
                <div className="rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 p-5">
                  <h2 className="text-xl font-bold text-white mb-2.5">{project.title}</h2>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-gray-300 font-mono border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-400 text-gray-950 text-sm font-bold shadow-[0_0_14px_rgba(250,204,21,0.35)] hover:bg-yellow-300 transition-colors"
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-yellow-400 w-8' : 'bg-gray-700 w-1.5 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

    </div>
  )
}

// Page
export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`
        )
        const data = await res.json()
        if (data.success) setProjects(data.data || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Page header */}
        <div className="pt-14 sm:pt-16 lg:pt-24 pb-10 lg:pb-14 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl gradient-text leading-none mb-3">
                Projects
              </h1>
              {!loading && projects.length > 0 && (
                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
                  {projects.length} selected work{projects.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed">
              A curated selection of my best fullstack projects — from SaaS products to e-commerce platforms.
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-6 h-6 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin" />
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-3">
            <span className="text-gray-600 text-4xl">◇</span>
            <p className="text-gray-500 text-base">No projects yet. Add them from your dashboard.</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="hidden sm:block">
            {projects.map((project, i) => (
              <ProjectBlock key={project._id} project={project} index={i} />
            ))}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="sm:hidden py-8">
            <MobileCarousel projects={projects} />
          </div>
        )}

      </div>

      <ContactSection
        title="Got a project in mind?"
        description="I'm available for freelance work. Let's discuss your idea and bring it to life."
        buttonText="Start a Conversation"
      />
    </Layout>
  )
}