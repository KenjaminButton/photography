# Software Design Document (SDD)
## Personal Photography Blog

### 1. Project Overview
- **Project Name:** Kenjamin Button's Photography Blog
- **Purpose:** Personal platform to share photography with blog posts
- **Core Need:** Ability to create posts with multiple images and text
- **Timeline:** ASAP

### 2. Simple Technical Stack
- **Framework:** Next.js 14 (handles both frontend and API routes)
- **Image Management:** Cloudinary
- **Data Storage:** Local JSON files (easy to backup and version control)
- **Styling:** Tailwind CSS for simple, responsive design

### 3. Key Features
1. **Admin Access**
   - Simple password protection for admin pages
   - No need for complex user management

2. **Blog Management**
   - Create new posts with text and multiple images
   - Edit or delete existing posts
   - Preview posts before publishing

3. **Image Handling**
   - Direct upload to Cloudinary
   - Image optimization and responsive sizing
   - Support for multiple images per post

### 4. Page Structure
- **Public Pages:**
  - Home (blog list)
  - Individual blog post view
- **Admin Pages:**
  - Login
  - New post
  - Edit post

### 5. Data Structure
```json
{
  "post": {
    "id": "string",
    "title": "string",
    "content": "string",
    "images": [
      {
        "url": "string",
        "alt": "string"
      }
    ],
    "datePublished": "string"
  }
}
```

### 6. Development Phases
1. **Setup (Week 1)**
   - Next.js project initialization
   - Cloudinary integration
   - Basic admin protection

2. **Core Features (Week 2)**
   - Blog post creation
   - Image upload functionality
   - Post viewing and listing

3. **Polish (Week 3)**
   - Styling and responsive design
   - Image optimization
   - Testing and bug fixes