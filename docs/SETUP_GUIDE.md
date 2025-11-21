# Complete Setup Guide

## Prerequisites

Before starting, ensure you have:
- Node.js v16 or higher installed
- npm or yarn package manager
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

## Step-by-Step Setup

### Part 1: Backend Setup (Strapi)

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install Strapi and all required dependencies. It may take 2-5 minutes.

#### 2. Generate Environment Variables

Create a `.env` file in the `backend` folder:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and replace the placeholder values with secure random strings:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-random-key-1,your-random-key-2
API_TOKEN_SALT=your-random-salt
ADMIN_JWT_SECRET=your-random-secret
TRANSFER_TOKEN_SALT=your-random-salt-2
JWT_SECRET=your-random-jwt-secret
```

**Quick way to generate random strings:**
```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

#### 3. Start Strapi

```bash
npm run develop
```

Strapi will:
- Build the admin panel
- Start the server on http://localhost:1337
- Open the admin registration page

#### 4. Create Admin Account

When the browser opens:
1. Fill in your admin details:
   - First name
   - Last name
   - Email
   - Password (min 8 characters)
2. Click "Let's start"

#### 5. Configure API Permissions

**IMPORTANT:** Make blog posts publicly accessible:

1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public** role
4. Scroll to **Blog-post** section
5. Check these permissions:
   - find
   - findOne
6. Click **Save** (top right)

#### 6. Create Your First Blog Post

1. Click **Content Manager** (left sidebar)
2. Click **Blog Post** → **Create new entry**
3. Fill in the form:
   - **Title**: "Welcome to Our Blog"
   - **Content**: Write some content using the rich text editor
   - **Image**: Click "Add more assets" and upload an image
   - **Category**: "Technology"
   - **Tags**: ["welcome", "first-post"] (as JSON array)
   - **Published Date**: Select today's date
   - **Excerpt**: "This is our first blog post..."
4. Click **Save**
5. Click **Publish** (top right)

Your backend is now ready.

---

### Part 2: Frontend Setup (Next.js)

#### 1. Install Frontend Dependencies

Open a **new terminal** (keep Strapi running) and run:

```bash
cd frontend
npm install
```

#### 2. Configure Environment Variables

Create `.env.local` file in the `frontend` folder:

```bash
# Copy the example
cp .env.local.example .env.local
```

The file should contain:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

#### 3. Start Next.js Development Server

```bash
npm run dev
```

Next.js will start on http://localhost:3000

#### 4. View Your Blog

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:1337/admin

You should see your blog post displayed on the homepage!

---

## Testing the Complete System

### Test 1: Create a New Post

1. Go to Strapi admin (http://localhost:1337/admin)
2. Create a new blog post with different content
3. Publish it
4. Refresh the frontend (http://localhost:3000)
5. You should see the new post appear

### Test 2: View Single Post

1. On the homepage, click "Read More" on any post
2. You should see the full post with all details
3. Click "Back to Home" to return

### Test 3: Edit a Post

1. In Strapi admin, edit an existing post
2. Change the title or content
3. Save and publish
4. Refresh the frontend to see changes

---

## Common Issues & Solutions

### Issue: "Cannot connect to Strapi"

**Solution:**
- Make sure Strapi is running on port 1337
- Check that `.env.local` has the correct URL
- Verify API permissions are set to Public

### Issue: "Images not loading"

**Solution:**
- Check that images are uploaded in Strapi
- Verify `next.config.js` has `localhost` in allowed domains
- Make sure the image field is populated in the API response

### Issue: "No posts showing"

**Solution:**
- Ensure posts are published (not just saved as drafts)
- Check API permissions are enabled for Public role
- Verify the API endpoint returns data: http://localhost:1337/api/blog-posts?populate=*

### Issue: Port already in use

**Solution:**
```bash
# Change Strapi port in backend/.env
PORT=1338

# Change Next.js port
npm run dev -- -p 3001
```

---

## Production Deployment

### Backend (Strapi)

1. Change database to PostgreSQL or MySQL
2. Set environment variables on your hosting platform
3. Run `npm run build` then `npm start`
4. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS

### Frontend (Next.js)

1. Update `NEXT_PUBLIC_STRAPI_URL` to production URL
2. Run `npm run build`
3. Deploy to platforms like:
   - Vercel (recommended)
   - Netlify
   - AWS Amplify

---

## Next Steps

- Add more blog posts
- Customize the styling
- Add search functionality
- Implement pagination
- Add author information
- Create category pages
- Add comments system

---

## Estimated Time

- Backend setup: 10-15 minutes
- Frontend setup: 5-10 minutes
- First blog post: 5 minutes
- **Total: 20-30 minutes**

Your blogging platform is ready to use.
