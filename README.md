# Dynamic Portfolio - MERN Stack

A modern, full-stack portfolio website built with the MERN stack featuring dynamic content management, file uploads, and a comprehensive admin panel. Production-ready with security features and optimized performance.

## 🚀 Tech Stack

### Frontend
- **Next.js 14+** - React framework with SSR/SSG
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection

## 📁 Project Structure

```
portfolio/
├── frontend/          # Next.js frontend application
│   ├── app/          # App router pages
│   ├── components/   # Reusable React components
│   └── lib/          # Utility functions
├── backend/          # Express.js backend API
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── server.js     # Main server file
└── static-backup/    # Original static files backup
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd portfolio
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   # From root directory
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: `admin@portfolio.com`
- Password: `ChangeThisPassword123!`

**⚠️ IMPORTANT**: Change the admin password immediately after first login!

## 📱 Features

### Public Features
- **Responsive Design** - Mobile-first approach
- **Dynamic Blog System** - Fetch blogs from database
- **Project Showcase** - Display projects dynamically
- **Contact Form** - Store messages in database
- **SEO Optimized** - Meta tags and structured data

### Admin Features
- **Secure Authentication** - JWT-based admin login system
- **Content Management** - Full CRUD operations for blogs and projects
- **File Upload System** - Image and video uploads with Multer
- **Publish/Unpublish** - Control content visibility
- **Featured Content** - Highlight important posts and projects
- **Clean Admin UI** - Intuitive dashboard and management interfaces
- **Contact Management** - View and respond to messages

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
cd backend
# Deploy to your preferred platform
```

## 📄 API Endpoints

### Public Endpoints
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/:slug` - Get single blog
- `GET /api/projects` - Get all projects
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get admin profile
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `GET /api/contact` - Get contact messages

## 🎨 Design System

The design maintains the original portfolio's aesthetic:
- **Colors**: Dark gradient background with yellow accents
- **Typography**: DM Sans, Poppins, Ubuntu fonts
- **Layout**: Bootstrap-inspired grid system with Tailwind
- **Components**: Consistent styling across all pages

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Previous Static Version**: https://my-portfolio-theta-two-46.vercel.app
