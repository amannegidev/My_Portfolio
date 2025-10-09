'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blog' },
    // { href: '/contact', label: 'Contact' },
  ]

  const socialLinks = [
    { href: 'https://www.facebook.com/share/1E7zgjuH2W/', icon: FaFacebook },
    { href: 'https://www.instagram.com/amannnegifr?igsh=MTRpcGdkZDk3MWxhdg==', icon: FaInstagram },
    { href: 'https://www.linkedin.com/in/amannegidev', icon: FaLinkedin },
    { href: 'https://github.com/amannegidev', icon: FaGithub },
  ]

  return (
    <nav className="mt-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold text-white">
            Myportfolio
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex gap-8 text-uppercase center-navlinks">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white hover:text-portfolio-yellow transition-colors duration-300 uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links - Desktop */}
          <div className="hidden lg:flex gap-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-portfolio-yellow transition-colors duration-300"
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="pt-4 pb-2">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white hover:text-portfolio-yellow transition-colors duration-300 uppercase tracking-wide block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media Links - Mobile */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-700">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-portfolio-yellow transition-colors duration-300"
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
