import Layout from '@/components/Layout'
import Link from 'next/link'
import ContactSection from '@/components/ContactSection'

export default function About() {
  const timelineItems = [
    {
      title: "Completed High School",
      year: "2020",
      description: "Finished my high school education in humanities with economics—never knew I'd one day become a web developer!"
    },
    {
      title: "Started Bachelor of Computer Applications (BCA)",
      year: "2021", 
      description: "Enrolled at Maharshi Dayanand University and began my programming journey, diving into coding, databases, and web development."
    },
    {
      title: "Graduated with a BCA Degree",
      year: "2025",
      description: "Successfully completed my degree, gaining expertise in programming, web development technologies, and frontend technologies like HTML, CSS, JavaScript, and Bootstrap. During this time, I also built my first website, marking the beginning of my journey into the world of web development."
    },
    {
      title: "Completed Full-Stack Development",
      year: "2025",
      description: "Expanding my skills in web development and exploring new technologies like Node.js, Express.js, MySQL, MongoDB, and React. Currently working on MERN projects, developing static websites with backend databases to gain hands-on experience in building scalable applications."
    },
    {
      title: "Intern",
      year: "2025",
      description: "Gained practical experience in web development during my internship at VSIT, where I worked on real-world projects, honed my technical skills, and collaborated in a professional environment."
    },
    {
      title: "to be continue...",
      year: "",
      description: ""
    }
  ]

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
      {/* About Section */}
      <section className="pt-12 lg:pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-6xl">
            <h1 className="text-7xl  gradient-text  mb-8">about me</h1>
            <p className="text-xl lg:text-xl text-gray-300 leading-relaxed justified no-justify">
              I'm aman negi, a fullstack developer from delhi, driven by the passion to build scalable, high-performance web applications. With expertise in the MERN stack, I craft seamless digital experiences that blend functionality with great user experience. I believe in writing clean, efficient code that transforms ideas into reality—whether it's designing intuitive frontends or optimizing backend performance. Constantly learning and evolving, I thrive on solving challenges and building tech that makes an impact.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <ul className="timeline pl-8">
              {timelineItems.map((item, index) => (
                <li key={index} className="timeline-item mb-8">
                  <h3 className="text-xl font-bold yellow-text mb-2">{item.title}</h3>
                  {item.year && <p className="text-gray-400 font-bold mb-3">{item.year}</p>}
                  {item.description && (
                    <p className="text-gray-300 justified no-justify leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
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
