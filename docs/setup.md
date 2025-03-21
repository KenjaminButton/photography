# Setup Guide

## Prerequisites
- Node.js 18+ installed
- Cloudinary account
- Turso account and CLI
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
   NEXTAUTH_SECRET=your_secure_secret
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_hashed_password  # Use bcrypt hash

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Database
   DATABASE_URL=your_turso_database_url
   DATABASE_AUTH_TOKEN=your_turso_auth_token
   ```

4. **Database Setup**
   ```bash
   # Install Turso CLI
   curl -sSfL https://get.tur.so/install.sh | bash

   # Initialize database
   npx tsx src/db/test-schema.ts
   ```

5. **Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Database First**
   - Verify Turso connection
   - Run schema migrations
   - Test database queries

2. **Authentication**
   - Set up admin credentials
   - Test protected routes
   - Verify session handling

3. **Image Management**
   - Configure Cloudinary
   - Test image uploads
   - Verify image optimization

4. **Content Management**
   - Create test posts
   - Verify image integration
   - Test post deletion

## Testing
- Run tests: `npm test`
- Check types: `npm run type-check`
- Lint code: `npm run lint`

## Deployment Checklist

1. **Environment Variables**
   - Set all required variables in Vercel
   - Double check database credentials
   - Verify Cloudinary settings

2. **Database**
   - Ensure Turso database is production-ready
   - Backup any important data
   - Test database connection

3. **Cloudinary**
   - Configure upload presets
   - Set CORS settings for production domain
   - Test image uploads in production

4. **Security**
   - Verify admin authentication
   - Check API route protection
   - Test rate limiting

5. **Performance**
   - Enable caching where appropriate
   - Verify image optimization
   - Test load times

## Production Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy!
