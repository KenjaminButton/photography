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

### 3. Development Flow
1. **Authentication First Approach**
   - Set up basic auth
   - Create protected routes
   - Add Cloudinary to protected routes
   - Test everything once

2. **Protected Features**
   - Admin dashboard
   - Image uploads
   - Post creation/editing
   - Site settings

3. **Public Features**
   - Home page
   - Blog post viewing
   - Image galleries

### 4. Implementation Phases
1. **Setup & Auth (Week 1)**
   - [x] Next.js project initialization
   - [ ] Basic password protection
   - [ ] Protected admin routes
   - [ ] Admin dashboard UI

2. **Cloudinary Integration (Week 1-2)**
   - [ ] Install Cloudinary SDK
   - [ ] Configure credentials
   - [ ] Test image uploads
   - [ ] Image transformation setup

3. **Core Features (Week 2)**
   - [ ] Blog post creation
   - [ ] Image upload functionality
   - [ ] Post viewing and listing
   - [ ] Admin post management

4. **Polish (Week 3)**
   - [ ] Styling and responsive design
   - [ ] Image optimization
   - [ ] Testing and bug fixes

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

### 6. Authentication Design
- Simple password protection
- Protected admin routes
- Secure session management
- No need for complex user management

### 7. Testing Strategy
1. **Auth Testing**
   - Verify protected routes
   - Test invalid credentials
   - Check session persistence

2. **Cloudinary Testing**
   - Upload success cases
   - Error handling
   - Image transformations

3. **Integration Testing**
   - End-to-end post creation
   - Image upload in posts
   - Public view access
