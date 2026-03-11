'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { FaGithub, FaLinkedin, FaInstagram, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { api } from '@/lib/api'

interface ContactForm {
  name: string
  email: string
  message: string
}

const socialLinks = [
  { icon: FaGithub,    label: 'GitHub',    href: 'https://github.com/amannegidev' },
  { icon: FaLinkedin,  label: 'LinkedIn',  href: 'https://linkedin.com/in/amannegidev' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://www.instagram.com/amannnegifr' },
]

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await api.submitContact(formData)
      if (response.success) {
        toast.success(response.message || "Message sent! I'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(response.message || 'Failed to send. Please try again.')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#111827', color: '#fff', border: '1px solid #374151', fontSize: '14px' },
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* Page header */}
        <div className="pt-14 sm:pt-16 lg:pt-24 pb-10 lg:pb-14 border-b border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl gradient-text leading-none mb-8">
                Contact
              </h1>
              <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">
                Let's work together
              </p>
            </div>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed">
              Open to freelance work, collaborations, and tech conversations. Drop me a message.
            </p>
          </div>
        </div>

        {/* Main content — bio left, form right */}
        <div className="py-14 sm:py-16 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left — bio + socials */}
          <div className="w-full lg:w-[42%] flex flex-col gap-8 lg:sticky lg:top-24">

            {/* Who I am */}
            <div className="">
              

            

              <p className="text-gray-400 text-base leading-relaxed">
                Looking for projects where I can go deep — not just ship and move on.
                I want to work on something that grows over time, see how decisions play
                out, and iterate based on what actually happens.
              </p>
              <br />

              <p className="text-gray-400 text-base leading-relaxed">
                Whether it's a long-term freelance engagement or a team building seriously
                good software — I'm interested. Let's talk.
              </p>
            </div>

            {/* Location pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-sm text-gray-400 self-start">
              <FaMapMarkerAlt className="text-yellow-500 text-xs flex-shrink-0" />
              Delhi, India — Remote / Hybrid / On-site
            </div>

            {/* Socials */}
            <div className="hidden sm:flex flex-col gap-3">
              <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Find me on</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 text-gray-400
                      hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-500/5 transition-all duration-200"
                  >
                    <Icon className="text-base" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Divider — vertical on desktop */}
          <div className="hidden lg:block w-px bg-gray-800 self-stretch flex-shrink-0" />

          {/* Right — form */}
          <div className="w-full lg:flex-1 bg-black p-5 rounded">
            <div className="mb-7">
              <span className="inline-flex items-center gap-2 text-yellow-500 text-xs font-mono tracking-widest uppercase">
                <span className="block w-5 h-px bg-yellow-500" />
                Send a Message
              </span>
              <p className="text-gray-500 text-sm mt-2">
                Fill out the form and I'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600
                      focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/20 transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600
                      focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/20 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Tell me about your project or idea..."
                  required
                  className="w-full px-4 py-3 rounded bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600
                    focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/20 transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start inline-flex items-center gap-3 px-7 py-3.5 rounded bg-yellow-400 text-gray-950 text-sm font-bold
                  hover:bg-yellow-300 transition-colors duration-200
                  shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:shadow-[0_0_28px_rgba(250,204,21,0.45)]
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-950 border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Send Message
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Mobile social links — centered below form */}
          <div className="sm:hidden w-full flex flex-col items-center gap-3 pt-8 mt-4">
            {/* <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">Find me on</p> */}
            <div className="w-full flex justify-center items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-700 text-gray-400
                    hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-500/5 transition-all duration-200"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}