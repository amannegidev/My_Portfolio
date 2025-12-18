import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Aman Negi - Full Stack Developer',
  description: 'A passionate full-stack developer from Delhi, specializing in MERN stack development. Building scalable, high-performance web applications with modern technologies.',
  themeColor: '#1f2937',
  authors: [{ name: 'Aman Negi' }],
  creator: 'Aman Negi',
  publisher: 'Aman Negi',
  openGraph: {
    title: 'Aman Negi - Full Stack Developer',
    description: 'A passionate full-stack developer from Delhi, specializing in MERN stack development.',
    url: 'https://your-domain.com',
    siteName: 'Aman Negi Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aman Negi Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aman Negi - Full Stack Developer',
    description: 'A passionate full-stack developer from Delhi, specializing in MERN stack development.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-portfolio-gradient min-h-screen font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
