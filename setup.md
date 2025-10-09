# Portfolio Setup Guide

## 🚀 Quick Start

Follow these steps to get your dynamic portfolio running:

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Setup

**Backend Environment:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

**Frontend Environment:**
```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NODE_ENV=development
```

### 3. Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Database will be created automatically

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Seed Database

```bash
cd backend
node scripts/seedDatabase.js
```

This will create:
- Admin user (admin@portfolio.com / admin123)
- Sample blog posts
- Sample projects

### 5. Start Development Servers

**Option A: Start both servers together (from root)**
```bash
npm run dev
```

**Option B: Start servers separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 6. Access Your Portfolio

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Login**: admin@portfolio.com / admin123

## 📁 Project Structure

```
portfolio/
├── frontend/                 # Next.js React application
│   ├── app/                 # App router pages
│   │   ├── page.tsx         # Home page
│   │   ├── about/           # About page
│   │   ├── projects/        # Projects page
│   │   ├── blogs/           # Blogs page
│   │   ├── contact/         # Contact page
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable components
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── Footer.tsx       # Footer component
│   │   └── Layout.tsx       # Page layout wrapper
│   ├── lib/                 # Utility functions
│   │   └── api.ts           # API client
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── next.config.js       # Next.js configuration
├── backend/                 # Express.js API server
│   ├── models/              # Mongoose models
│   │   ├── User.js          # User model
│   │   ├── Blog.js          # Blog model
│   │   ├── Project.js       # Project model
│   │   └── Contact.js       # Contact model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── blogs.js         # Blog CRUD routes
│   │   ├── projects.js      # Project CRUD routes
│   │   └── contact.js       # Contact routes
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   ├── scripts/             # Utility scripts
│   │   └── seedDatabase.js  # Database seeder
│   ├── package.json         # Backend dependencies
│   ├── server.js            # Main server file
│   └── .env.example         # Environment template
├── static-backup/           # Original static files
├── package.json             # Root package.json
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

## 🛠️ Development Workflow

### Adding New Blog Posts
1. Use the API endpoints or create an admin panel
2. POST to `/api/blogs` with blog data
3. Blogs appear automatically on the frontend

### Adding New Projects
1. POST to `/api/projects` with project data
2. Projects appear on the projects page

### Managing Contact Messages
1. GET `/api/contact` to view messages
2. Mark as read/replied via API

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string
- Check network connectivity

**Port Already in Use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

**Module Not Found Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors:**
- Check FRONTEND_URL in backend .env
- Verify API URL in frontend .env.local

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check that all dependencies are installed

## 🎉 Next Steps

1. Customize the design to match your preferences
2. Add more pages or features
3. Create an admin dashboard
4. Set up email notifications for contact forms
5. Add analytics and SEO optimization
6. Deploy to production

Your dynamic portfolio is now ready! 🚀
