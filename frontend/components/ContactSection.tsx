import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

interface ContactSectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export default function ContactSection({
  title = "Are You Ready to Kickstart Your Project?",
  description = "Turn your ideas into reality with expert development. Let's build something amazing together!",
  buttonText = "Send Me a Message",
  buttonLink = "/contact"
}: ContactSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-8 sm:px-6 lg:px-8 max-w-6xl">

        <div className="relative overflow-hidden border border-white rounded-xl px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20 text-center">

          {/* Decorative glow blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 "
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 "
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32"
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-blue-400 text-xs font-mono tracking-widest uppercase mb-5">
              <span className="block w-5 h-px bg-blue-400" />
              Let's Work Together
              <span className="block w-5 h-px bg-blue-400" />
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white leading-tight mb-5">
              {title}
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-blue-200/60 leading-relaxed mb-10 max-w-xl mx-auto">
              {description}
            </p>

            <Link
              href={buttonLink}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded bg-yellow-400 text-gray-950 font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-yellow-300 transition-colors duration-200  group"
            >
              {buttonText}
              <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}