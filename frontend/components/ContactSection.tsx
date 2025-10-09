import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

interface ContactSectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export default function ContactSection({
  title = "Are You Ready to kickstart your project?",
  description = "Turn your ideas into reality with expert development and seamless solutions. Let's build something amazing together!",
  buttonText = "Send Me Message",
  buttonLink = "/contact"
}: ContactSectionProps) {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="contact-box rounded-lg p-12 bg-yellow border border-gray-700">
          <h2 className="text-3xl lg:text-6xl  mb-6">
            {title}
          </h2>
          <p className="text-lg mb-8 mx-auto">
            {description}
          </p>
          <Link 
            href={buttonLink} 
            className="inline-flex items-center gap-3 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {buttonText} <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
