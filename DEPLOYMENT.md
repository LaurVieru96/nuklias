# Production Deployment Guide

## 🎯 Architecture Overview

```
Browser
  ↓
Netlify (React Frontend)
  ↓ API calls
Render (Express Backend)
  ↓
Neon PostgreSQL
```

---

## 📋 Deployment Checklist

### ✅ **Step 1: Deploy Backend to Render**

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `LaurVieru96/nuklias`
   - **Root Directory**: Leave empty (Render will use package.json in root)
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:server`

3. **Environment Variables on Render**
   Add these in Render dashboard:
   ```
   DATABASE_URL=<your-neon-connection-string>
   SESSION_SECRET=<random-secure-string>
   NODE_ENV=production
   CLIENT_URL=https://nuklias.netlify.app
   ```

4. **Get Your Backend URL**
   - After deployment, Render will give you a URL like:
   - `https://nuklias-api.onrender.com`
   - Copy this URL!

---

### ✅ **Step 2: Update Frontend for Production**

1. **Add Environment Variable to Netlify**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add:
     ```
     VITE_API_URL=https://nuklias-api.onrender.com
     ```

2. **Redeploy Frontend**
   - Netlify will auto-redeploy when you push to GitHub
   - Or manually trigger redeploy in Netlify dashboard

---

### ✅ **Step 3: Test Production**

1. **Test Backend Health**
   ```
   https://nuklias-api.onrender.com/api/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Test Login**
   - Go to `https://nuklias.netlify.app/login`
   - Login with: `admin@nuklias.com` / `Admin123!`
   - Should redirect to dashboard

3. **Check Browser Console**
   - No CORS errors
   - Cookies are set
   - API calls work

---

## 🔧 Important Notes

### **CORS Configuration**
Backend is already configured to accept requests from your Netlify domain.

### **Session Cookies**
- Cookies work across domains with `sameSite: 'none'` and `secure: true`
- This is already configured in production mode

### **Database**
- Neon PostgreSQL works from anywhere
- No changes needed

### **Free Tier Limits**
- **Render Free**: Backend sleeps after 15 min inactivity (cold start ~30s)
- **Netlify Free**: 100GB bandwidth/month
- **Neon Free**: 0.5GB storage, 1 project

---

## 🚨 Troubleshooting

### Login doesn't work
1. Check browser console for CORS errors
2. Verify `VITE_API_URL` is set in Netlify
3. Check cookies in DevTools → Application → Cookies

### Backend is slow
- Render free tier has cold starts
- First request after sleep takes ~30 seconds
- Consider upgrading to paid tier ($7/month)

### Database connection fails
- Check `DATABASE_URL` in Render environment variables
- Verify Neon database is active

---

## 📝 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Frontend: `nuklias.com` → Netlify
   - Backend: `api.nuklias.com` → Render

2. **Monitoring**
   - Render dashboard shows logs and metrics
   - Netlify shows deployment history

3. **Security**
   - Change default passwords
   - Rotate `SESSION_SECRET`
   - Enable rate limiting

---

## 🎉 You're Done!

Your dashboard is now live:
- **Frontend**: https://nuklias.netlify.app
- **Backend**: https://nuklias-api.onrender.com
- **Database**: Neon PostgreSQL

**Test Credentials:**
- Admin: `admin@nuklias.com` / `Admin123!`
- Member: `member@nuklias.com` / `Member123!`
