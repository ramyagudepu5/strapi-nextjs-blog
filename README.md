# Strapi Blogging Platform

A full-stack blogging platform built with Strapi CMS (backend) and Next.js (frontend).

## Architecture

```
Strapi Admin Panel (Content Management)
           ↓
Strapi Backend (Database + Content Storage)
           ↓
Strapi REST API (Auto-generated endpoints)
           ↓
Next.js Frontend (React Application)
           ↓
User Views Blog Posts
```

## Features

### Backend (Strapi)
- Blog Post content type with fields: Title, Content, Image, Category, Tags, Published Date
- Full CRUD operations via admin panel
- Image upload and management
- REST API endpoints for content delivery

### Frontend (Next.js)
- Blog list page with all posts
- Individual post detail pages
- Responsive card-based layout
- Category and tag display
- Image thumbnails

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup (Strapi)

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start Strapi development server:
```bash
npm run develop
```

4. Create admin user:
- Open http://localhost:1337/admin
- Register your first admin user
- Complete the setup wizard

5. Configure API permissions:
- Go to Settings → Users & Permissions → Roles → Public
- Enable permissions for Blog Post: find, findOne
- Save changes

### Frontend Setup (Next.js)

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open browser:
- Frontend: http://localhost:3000
- Backend Admin: http://localhost:1337/admin

## Creating Your First Blog Post

1. Go to Strapi admin panel (http://localhost:1337/admin)
2. Click "Content Manager" → "Blog Post"
3. Click "Create new entry"
4. Fill in:
   - Title
   - Content (use rich text editor)
   - Upload an image
   - Add category
   - Add tags (comma-separated)
   - Set published date
5. Click "Save" and "Publish"
6. View on frontend at http://localhost:3000

## API Endpoints

- `GET /api/blog-posts` - Fetch all blog posts
- `GET /api/blog-posts/:id` - Fetch single blog post

## Project Structure

```
strapi-blog-project/
├── backend/          # Strapi CMS
├── frontend/         # Next.js application
├── docs/            # Architecture diagrams
└── README.md        # This file
```

## Technologies Used

- **Backend**: Strapi v4 (Headless CMS)
- **Frontend**: Next.js 14 (React Framework)
- **Styling**: CSS Modules
- **Database**: SQLite (default, can be changed to PostgreSQL/MySQL)

## Estimated Setup Time

20-30 minutes for complete setup and first blog post creation.

## Sample UI Reference

This project is inspired by modern blog platforms like [Orange Flex Blog](https://flex.orange.pl/blog) with:
- Clean card-based layout
- Responsive grid design
- Category badges
- Tag system
- Professional typography

## Additional Documentation

For more detailed information, see:
- **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Detailed setup instructions
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System architecture
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment

## Troubleshooting

Common issues:
- **API 403 Error**: Check public permissions in Strapi Settings
- **Images not loading**: Verify next.config.js image domains
- **No posts showing**: Ensure posts are published, not drafts

## License

MIT License
