'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaHome } from 'react-icons/fa'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blogs', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Desktop Navbar (hidden on mobile entirely) ───────── */}
      <nav
        className={`hidden lg:block sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-start h-16">
            {/* Brand */}
            <Link
              href="/"
              className="text-white font-bold text-lg tracking-tight hover:text-yellow-400 transition-colors duration-200"
            >
              Aman<span className="text-yellow-400">.</span>
            </Link>

            {/* Nav Links - Pushed to right */}
            <ul className="flex items-center gap-8 ml-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative text-sm font-medium uppercase tracking-widest transition-colors duration-200 group ${
                        isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-yellow-400 transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Mobile Floating Navbar ───────────────────────────── */}
      {/* No top bar at all — only this floating pill exists on mobile */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-1 px-2 py-2 rounded-xl bg-gray-950 border border-yellow-500/40 ">

          {/* Home icon */}
          <Link
            href="/"
            aria-label="Home"
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              pathname === '/'
                ? 'bg-yellow-400 text-gray-950 '
                : 'text-yellow-400 hover:bg-yellow-400/15 hover:text-yellow-300'
            }`}
          >
            <FaHome size={15} />
          </Link>

          {/* Divider */}
          <span className="w-px h-5 bg-yellow-500/25 mx-0.5" />

          {/* Text links */}
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 text-gray-950 '
                    : 'text-yellow-300 hover:bg-yellow-400/15 hover:text-yellow-400'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Navbar