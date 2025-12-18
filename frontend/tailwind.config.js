/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '3rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      sans: ['"Stack Sans Headline"', 'sans-serif'],
    },
    extend: {
      colors: {
        // Custom colors matching your original design
        'portfolio-dark': '#050611',
        'portfolio-blue': '#040c24', 
        'portfolio-deep': '#060c50',
        'portfolio-yellow': '#ffea00',
      },
      backgroundImage: {
        'portfolio-gradient': 'linear-gradient(to right, #050611 0%, #040c24 50%, #060c50 100%)',
        'text-gradient': 'linear-gradient(to bottom, rgb(208, 210, 215), rgb(29, 24, 127))',
        'button-gradient': 'linear-gradient(to bottom, rgb(12, 11, 11), rgb(24, 13, 181))',
      },
      fontFamily: {
        'stack-headline': ['"Stack Sans Headline"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
