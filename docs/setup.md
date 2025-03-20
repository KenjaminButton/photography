# Setup Guide

## Prerequisites
- Node.js 18+ installed
- Cloudinary account
- Git

## Initial Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KenjaminButton/photography.git
   cd photography
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file:
   ```
   # Authentication
   ADMIN_PASSWORD=your_secure_password

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Authentication First**
   - Set up admin password
   - Test protected routes
   - Verify security measures

2. **Image Management**
   - Configure Cloudinary
   - Test image uploads
   - Verify transformations

3. **Content Management**
   - Create test posts
   - Verify image integration
   - Test markdown rendering

## Testing
- Run tests: `npm test`
- Check types: `npm run type-check`
- Lint code: `npm run lint`

## Deployment
- Automatic deployment via Vercel
- Environment variables must be set in Vercel dashboard
- Ensure Cloudinary CORS settings are configured
