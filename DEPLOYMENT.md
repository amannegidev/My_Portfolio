# 🚀 Production Deployment Guide

This guide will help you deploy your portfolio to production environments.

## 📋 Pre-Deployment Checklist

- [ ] Database cleaned of sample data
- [ ] Admin password changed from default
- [ ] Environment variables configured
- [ ] File uploads tested
- [ ] All features working locally
- [ ] Security headers enabled
- [ ] Rate limiting configured

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Backend Deployment (Railway)
1. **Create Railway Account**: https://railway.app
2. **Connect Repository**: Link your GitHub repository
3. **Configure Environment Variables**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   FRONTEND_URL=https://your-domain.vercel.app
   PORT=5000
   NODE_ENV=production
   ```
4. **Deploy**: Railway will automatically build and deploy

#### Frontend Deployment (Vercel)
1. **Create Vercel Account**: https://vercel.com
2. **Import Project**: Connect your GitHub repository
3. **Configure Build Settings**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
5. **Deploy**: Vercel will build and deploy automatically

### Option 2: Netlify (Frontend) + Render (Backend)

#### Backend Deployment (Render)
1. **Create Render Account**: https://render.com
2. **Create Web Service**: Connect your repository
3. **Configure Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Environment Variables**: Same as Railway above
5. **Deploy**: Render will build and deploy

#### Frontend Deployment (Netlify)
1. **Create Netlify Account**: https://netlify.com
2. **Deploy Site**: Drag and drop or connect Git
3. **Build Settings**:
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `frontend/.next`
4. **Environment Variables**: Same as Vercel above

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create Atlas Account**: https://mongodb.com/atlas
2. **Create Free Cluster**: M0 Sandbox (Free forever)
3. **Database User**:
   - Username: `portfolio_user`
   - Password: Generate secure password
4. **Network Access**: Add `0.0.0.0/0` for development (restrict in production)
5. **Get Connection String**: 
   ```
   mongodb+srv://portfolio_user:password@cluster0.xxxxx.mongodb.net/portfolio
   ```

## 🔐 Security Checklist

### Backend Security
- [ ] JWT secret is long and random (64+ characters)
- [ ] MongoDB connection uses authentication
- [ ] CORS configured for your domain only
- [ ] Rate limiting enabled
- [ ] Helmet security headers active
- [ ] File upload restrictions in place
- [ ] Input validation on all endpoints

### Frontend Security
- [ ] API URLs use HTTPS in production
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly configured
- [ ] CSP headers configured if needed

## 📁 File Upload Configuration

### Development (Local Storage)
Files are stored in `backend/uploads/` directory (gitignored).

### Production (Recommended: Cloud Storage)
For production, consider using:
- **AWS S3**: Scalable object storage
- **Cloudinary**: Image/video optimization
- **Google Cloud Storage**: Google's storage solution

Update the upload middleware to use cloud storage in production.

## 🔧 Environment Variables Reference

### Backend Production Variables
```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# Security
JWT_SECRET=your_64_character_random_string_here
NODE_ENV=production

# CORS
FRONTEND_URL=https://your-domain.com

# Server
PORT=5000

# Optional: Email service for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Production Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🚀 Deployment Commands

### Manual Deployment
```bash
# Backend
cd backend
npm install --production
npm start

# Frontend
cd frontend
npm install
npm run build
npm start
```

### Docker Deployment (Optional)
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Monitoring & Maintenance

### Health Checks
- Backend: `GET /api/health`
- Frontend: Check if pages load correctly
- Database: Monitor connection status

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Monitor server logs
- [ ] Backup database regularly
- [ ] Check security vulnerabilities
- [ ] Monitor file upload storage

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Check MongoDB connection string
- Verify environment variables
- Check port availability

**Frontend can't connect to backend:**
- Verify API URL in environment variables
- Check CORS configuration
- Ensure backend is running

**File uploads failing:**
- Check file size limits
- Verify upload directory permissions
- Check Multer configuration

**Database connection issues:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

## 📞 Support

If you encounter issues:
1. Check the logs for error messages
2. Verify all environment variables
3. Test locally first
4. Check deployment platform documentation

---

**Your portfolio is now ready for production! 🎉**
