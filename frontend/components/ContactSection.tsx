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
  description = "Turn your ideas into reality with expert development. Let's build something amazing together!",
  buttonText = "Send Me Message",
  buttonLink = "/contact"
}: ContactSectionProps) {
  return (
    <section className="pt-6 lg:py-20">
      <div className="container mx-auto px-4 text-center ">
        <div className="contact-box rounded-lg bg-yellow py-12 px-4 border border-gray-700">
          <h2 className="text-xl lg:text-5xl px-2 mb-6 leading-relaxed">
            {title}
          </h2>
          {/* <p className="text-lg mb-8 mx-auto px-2 display-none md-display-block">
            {description}
          </p> */}
          <Link 
            href={buttonLink} 
            className="inline-flex items-center gap-3 text-white px-8 bg-black ring-2 ring-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            {buttonText} <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
