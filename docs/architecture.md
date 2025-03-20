# Photography Blog Architecture

## Overview
A minimalist photography blog built with Next.js 14, featuring simple authentication and Cloudinary integration.

## Technical Stack
- **Frontend & Backend:** Next.js 14 with App Router
- **Image Management:** Cloudinary
- **Data Storage:** Local JSON files
- **Styling:** Tailwind CSS, with custom design system
- **Authentication:** Simple password protection

## Design Principles
1. **Minimalist Architecture**
   - Single-user system
   - No complex database
   - Built-in Next.js features

2. **Security First**
   - Protected admin routes
   - Secure image uploads
   - Environment variable protection

3. **Performance**
   - Optimized images via Cloudinary
   - Static page generation where possible
   - Minimal client-side JavaScript

## System Components

### Authentication
- Simple password protection
- Protected admin routes
- Secure session management

### Image Management
- Cloudinary integration
- Automatic optimization
- Multiple image support per post

### Data Structure
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

## UI Design
- **Typography:**
  - Headings: Playfair Display
  - Body: Inter
- **Colors:**
  - Primary: White (#FFFFFF)
  - Text: Dark Gray (#2C2C2C)
  - Accents: Light Gray (#F5F5F5)
  - Highlights: Warm gray (#E8E8E8)
- **Layout:** Grid-based with full-width images
