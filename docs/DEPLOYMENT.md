# Deployment Guide

## Overview

This guide covers deploying your Strapi blog to production.

## Backend Deployment (Strapi)

### Option 1: Railway

1. Create account at railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables
5. Deploy

### Option 2: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create my-blog-api`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql`
5. Set env vars: `heroku config:set APP_KEYS=...`
6. Deploy: `git push heroku main`

### Option 3: DigitalOcean

1. Create a Droplet (Ubuntu)
2. Install Node.js and PostgreSQL
3. Clone your repository
4. Set up environment variables
5. Use PM2 to run: `pm2 start npm --name "strapi" -- start`

## Frontend Deployment (Next.js)

### Option 1: Vercel (Recommended)

1. Go to vercel.com
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_STRAPI_URL=https://your-api.com`
5. Deploy

### Option 2: Netlify

1. Go to netlify.com
2. Import repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

## Environment Variables

### Backend (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-production-keys
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
DATABASE_URL=postgresql://...
```

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-api.com
```

## Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Admin panel works
- [ ] API returns data
- [ ] Frontend loads
- [ ] Images display correctly
- [ ] HTTPS is enabled
- [ ] CORS is configured
- [ ] Database backups enabled

## Security

1. Use strong passwords
2. Enable HTTPS only
3. Set up CORS properly
4. Use environment variables
5. Enable rate limiting
6. Regular security updates

## Monitoring

- Set up error tracking (Sentry)
- Monitor uptime (UptimeRobot)
- Check performance (Lighthouse)
- Review logs regularly
