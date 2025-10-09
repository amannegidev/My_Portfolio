'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { FaPhone, FaEnvelope, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import { api } from '@/lib/api'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await api.submitContact(formData)
      
      if (response.success) {
        toast.success(response.message || 'Message sent successfully! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        toast.error(response.message || 'Failed to send message. Please try again.')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast.error(error.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <Toaster position="top-right" />
      
      {/* Contact Header */}
      <section className="pt-12 lg:pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-6xl mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-8">
              Let's connect and build something great!
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed justified">
              Whether you have a project idea, need a developer for collaboration, or just want to discuss
              technology, feel free to reach out! I'm always open to new opportunities, freelance work, or
              just a tech conversation. Drop me a message, and let's create something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="formsection py-12">
        <div className="container mx-auto px-4">
          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 items-center mb-12">
            <div className="contactinfo">
              <FaPhone className="inline mr-2" />
              Number: 8745063206
            </div>
            
            <a href="mailto:negi10756@gmail.com" className="contactinfo hover:border-portfolio-yellow transition-colors duration-300">
              <FaEnvelope className="inline mr-2" />
              Email: negi10756@gmail.com
            </a>
            
            <a 
              href="https://wa.me/918745063206?text=Hey%20Aman!%20I%20want%20to%20discuss%20a%20project." 
              target="_blank" 
              rel="noopener noreferrer"
              className="contactinfo hover:border-portfolio-yellow transition-colors duration-300"
              aria-label="Chat with me on WhatsApp"
            >
              <FaWhatsapp className="inline mr-2" />
              Chat with Me
            </a>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-xl yellow-text">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Johnny"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-portfolio-yellow transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-xl yellow-text">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-portfolio-yellow transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-xl yellow-text">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full py-3 px-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-portfolio-yellow transition-colors duration-300 resize-vertical"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submitbtn bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="text-sm" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  )
}
