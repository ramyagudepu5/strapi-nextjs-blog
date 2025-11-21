# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     STRAPI BLOGGING PLATFORM                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   Admin User         │
│   (Content Creator)  │
└──────────┬───────────┘
           │
           │ Creates/Edits Posts
           ▼
┌──────────────────────────────────────────────────────────────┐
│                    STRAPI ADMIN PANEL                         │
│                    (http://localhost:1337/admin)              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Create Blog Posts                                   │  │
│  │  • Upload Images                                       │  │
│  │  • Manage Categories & Tags                           │  │
│  │  • Edit/Delete Content                                │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Stores Data
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    STRAPI BACKEND                             │
│                    (Node.js + Strapi CMS)                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Content Type: Blog Post                              │  │
│  │  • title (String)                                     │  │
│  │  • content (Rich Text)                                │  │
│  │  • image (Media)                                      │  │
│  │  • category (String)                                  │  │
│  │  • tags (JSON Array)                                  │  │
│  │  • publishedDate (Date)                               │  │
│  │  • excerpt (Text)                                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│  Database: SQLite (default)                                  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Exposes REST API
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    STRAPI REST API                            │
│                    (Auto-generated)                           │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  GET  /api/blog-posts          → List all posts      │  │
│  │  GET  /api/blog-posts/:id      → Get single post     │  │
│  │  POST /api/blog-posts          → Create post (admin) │  │
│  │  PUT  /api/blog-posts/:id      → Update post (admin) │  │
│  │  DELETE /api/blog-posts/:id    → Delete post (admin) │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTP Requests
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                           │
│                    (React Application)                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Pages:                                               │  │
│  │  • / (Home - Blog List)                               │  │
│  │  • /post/[id] (Single Post View)                      │  │
│  │                                                        │  │
│  │  Components:                                          │  │
│  │  • BlogCard - Post preview card                       │  │
│  │                                                        │  │
│  │  Services:                                            │  │
│  │  • api.js - Strapi API integration                    │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ Renders UI
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    END USER                                   │
│                    (Blog Reader)                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  • Views blog posts                                   │  │
│  │  • Reads full articles                                │  │
│  │  • Browses by category/tags                           │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Content Creation Flow:**
   - Admin logs into Strapi admin panel
   - Creates/edits blog post with title, content, image, etc.
   - Saves and publishes the post
   - Data stored in SQLite database

2. **Content Delivery Flow:**
   - User visits frontend (Next.js app)
   - Frontend makes API request to Strapi
   - Strapi returns JSON data with blog posts
   - Frontend renders the data as HTML/CSS
   - User sees formatted blog posts

## Technology Stack

### Backend
- **Strapi v4**: Headless CMS framework
- **Node.js**: JavaScript runtime
- **SQLite**: Database (can be changed to PostgreSQL/MySQL)
- **REST API**: Auto-generated by Strapi

### Frontend
- **Next.js 14**: React framework with SSR/SSG
- **React 18**: UI library
- **Axios**: HTTP client for API calls
- **CSS Modules**: Component-scoped styling

## Key Features

1. **Content Management**
   - CRUD operations for blog posts
   - Rich text editor for content
   - Image upload and management
   - Category and tag organization

2. **API Integration**
   - RESTful API endpoints
   - Automatic API documentation
   - Public read access
   - Admin-only write access

3. **Frontend Display**
   - Responsive grid layout
   - Card-based post previews
   - Full post detail pages
   - Image optimization with Next.js

## Security

- Admin panel protected by authentication
- Public API endpoints for read-only access
- Media files served securely
- Environment variables for sensitive data
