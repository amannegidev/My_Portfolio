import Layout from '@/components/Layout'
import Image from 'next/image'
import ContactSection from '@/components/ContactSection'

export default function About() {

  const services = [
    {
      title: "Frontend Development",
      description: "Designing and developing modern, responsive, and interactive user interfaces using the latest frontend technologies. Ensuring smooth user experiences with optimized performance, accessibility, and pixel-perfect designs."
    },
    {
      title: "Backend Development", 
      description: "Building secure, scalable, and efficient server-side applications with powerful backend frameworks. Implementing APIs, database management, and authentication systems to create robust web applications."
    },
    {
      title: "Full-Stack Development",
      description: "Combining frontend and backend expertise to develop complete web solutions. Handling everything from UI/UX design to backend architecture, ensuring seamless integration, efficiency, and performance."
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-12 lg:pt-20">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-7xl gradient-text mb-16 text-center lg:text-left">About</h1>
          
          {/* About Content with Image */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
         

            {/* Content Side */}
            <div className="w-full lg:w-7/12">
              <div className="space-y-6">
                <div>
                
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                   Hi, I'm Aman Negi A fullstack developer from Delhi, driven by the passion to build scalable, high-performance web applications.
                  </p>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed">
                  With expertise in the MERN stack, I craft seamless digital experiences that blend functionality with great user experience. I believe in writing clean, efficient code that transforms ideas into reality—whether it's designing intuitive frontends or optimizing backend performance.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Constantly learning and evolving, I thrive on solving challenges and building tech that makes an impact. My journey in web development is fueled by curiosity and a commitment to excellence.
                </p>

            
              </div>
            </div>

               {/* Image Side */}
            <div className="w-full lg:w-5/12">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                  <Image
                    src="https://studio.code.org/shared/images/courses/logo_tall_oceans.jpg"
                    alt="Aman Negi - Full Stack Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mb-12">
            <h2 className="text-7xl  gradient-text  mb-8">Services</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Providing End-to-End Web Development Solutions – From Dynamic Frontend Designs to Robust Backend Systems, 
              Ensuring Scalable, High-Performance, and User-Centric Digital Experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-600 rounded-lg p-6 services hover:border-portfolio-yellow transition-colors duration-300">
                <h3 className="text-xl font-bold yellow-text mb-4">{service.title}</h3>
                <hr className="border-portfolio-yellow mb-4" />
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
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
