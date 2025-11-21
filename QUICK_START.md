# Quick Start Guide

## Prerequisites
- Node.js v16+ installed
- Terminal access

## Setup Steps

### 1. Run Setup Script

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

This creates environment files with secure random keys.

### 2. Install & Start Backend

```bash
cd backend
npm install
npm run develop
```

Wait for Strapi to open in your browser (http://localhost:1337/admin)

### 3. Create Admin Account

Fill in the registration form:
- First name, Last name
- Email, Password (min 8 chars)
- Click "Let's start"

### 4. Enable API Permissions

**Important:**

1. Go to **Settings** → **Users & Permissions** → **Roles**
2. Click **Public**
3. Under **Blog-post**, check:
   - find
   - findOne
4. Click **Save**

### 5. Create First Blog Post

1. Click **Content Manager** → **Blog Post**
2. Click **Create new entry**
3. Fill in:
   - Title: "Welcome to My Blog"
   - Content: Write something
   - Upload an image
   - Category: "General"
   - Tags: `["welcome", "first"]` (as JSON array)
   - Published Date: Today
   - Excerpt: "My first post"
4. Click **Save** then **Publish**

### 6. Install & Start Frontend

Open a **NEW terminal** (keep Strapi running):

```bash
cd frontend
npm install
npm run dev
```

### 7. View Your Blog

Open browser:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:1337/admin

## Done

You should see your blog post on the homepage.

## Next Steps

- Create more blog posts
- Customize the design
- Read full documentation in `docs/`

## Need Help?

See `docs/SETUP_GUIDE.md` for detailed troubleshooting.
