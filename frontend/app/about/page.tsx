import Layout from '@/components/Layout'
import Image from 'next/image'
import ContactSection from '@/components/ContactSection'

export default function About() {

  const services = [
    {
      icon: "◈",
      title: "Frontend Development",
      description: "Building modern, responsive interfaces with React and Next.js. Focused on performance, accessibility, and pixel-perfect execution across all devices."
    },
    {
      icon: "⬡",
      title: "Backend Development",
      description: "Designing secure REST APIs, database architecture, and authentication systems using Node.js, Express, and MongoDB for production-ready applications."
    },
    {
      icon: "◇",
      title: "Full-Stack Development",
      description: "End-to-end ownership — from UI design to server infrastructure. Delivering complete, integrated web solutions that are fast, scalable, and maintainable."
    },
    {
      icon: "▣",
      title: "Landing Page Development",
      description: "Crafting high-converting, visually compelling landing pages optimised for speed and SEO. Designed to capture attention, communicate value, and drive action."
    },
    {
      icon: "◉",
      title: "E-Commerce Development",
      description: "Building fully-featured online stores with product listings, cart systems, and secure payment integration via Stripe or Razorpay — ready to scale."
    }
  ]

  return (
    <Layout>

      {/* ── Hero / About ─────────────────────────────────────── */}
      <section className="pt-14 sm:pt-16 lg:pt-24 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Page title */}
          <h1 className="text-7xl sm:text-7xl lg:text-8xl gradient-text  mb-8 lg:mb-16 text-center lg:text-left leading-none">
            About
          </h1>

          {/* Bio + Image */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Text */}
            <div className="w-full lg:w-[58%] space-y-5">
              <span className="inline-flex items-center gap-2 text-yellow-500 text-xs font-mono tracking-widest uppercase">
                <span className="block w-5 h-px bg-yellow-500" />
                Fullstack Developer · Delhi, India
              </span>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed font-medium">
                Hi, I'm Aman Negi — a fullstack developer driven by the passion to build
                scalable, high-performance web applications.
              </p>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                With expertise in the MERN stack, I craft seamless digital experiences
                that blend functionality with great user experience. I believe in writing
                clean, efficient code that transforms ideas into reality — whether it's
                designing intuitive frontends or optimising backend performance.
              </p>

              <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                Constantly learning and evolving, I thrive on solving challenges and
                building tech that makes an impact. My journey in web development is
                fuelled by curiosity and a commitment to excellence.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: 'Years Experience', value: '2+' },
                  { label: 'Projects Shipped', value: '15+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gray-900 border border-gray-700"
                  >
                    <span className="text-yellow-400 font-bold text-sm">{stat.value}</span>
                    <span className="text-gray-500 text-xs">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
            <div>
              <h2 className="text-7xl sm:text-6xl lg:text-7xl gradient-text  leading-none mb-8">
                Services
              </h2>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">
                End-to-end web development — from dynamic frontend designs to robust
                backend systems, delivering scalable and user-centric digital experiences.
              </p>
            </div>
          </div>

          {/* Cards — 3 cols on lg, 2 on md, 1 on sm */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex flex-col gap-4 p-6 rounded-xl border border-gray-700 bg-gray-900/40 hover:border-yellow-500/60 hover:bg-gray-900/70 transition-all duration-300"
              >
                {/* Icon + title row */}
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 text-2xl leading-none mt-0.5 select-none">
                    {service.icon}
                  </span>
                  <h3 className="text-lg font-bold text-yellow-400 leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors duration-300" />

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <ContactSection />

    </Layout>
  )
}