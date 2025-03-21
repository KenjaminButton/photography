# Kenjamin Button Photography

A modern photography portfolio and blog built with Next.js 14, featuring secure admin authentication and dynamic content management.

## Features

- **Modern Stack**: Next.js 14, TypeScript, and Tailwind CSS
- **Secure Authentication**: NextAuth.js implementation with protected admin routes
- **Admin Dashboard**: Create, publish, and delete posts
- **Image Management**: Cloudinary integration for optimized image delivery
- **Blog System**: Dynamic post creation with rich content and images
- **Responsive Design**: Beautiful, mobile-first layout
- **Database**: Turso SQLite for reliable data storage

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/KenjaminButton/photography.git
cd photography
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
# Authentication
NEXTAUTH_SECRET=your_secure_secret
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_hashed_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database
DATABASE_URL=your_turso_database_url
DATABASE_AUTH_TOKEN=your_turso_auth_token
```

4. Initialize the database:
```bash
npx tsx src/db/test-schema.ts
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Security

- Passwords are securely hashed using bcrypt
- Protected admin routes with NextAuth.js
- Environment variables for sensitive data
- Session-based authentication
- SQL injection protection with parameterized queries

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Turso SQLite
- **Image Hosting**: Cloudinary
- **Deployment**: Vercel (recommended)

## Features Status

✅ Completed:
- Authentication system
- Admin dashboard
- Post creation and deletion
- Image upload and optimization
- Responsive design
- Database integration

🔜 Coming Soon:
- Post editing
- Image galleries
- Categories and tags
- Search functionality

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - See LICENSE file for details

## Color Palette

- Primary: #26294D (Dark Blue)
- Secondary: #E092C1 (Pink)
- Accent: #B9A1E4 (Purple)
- Background: #FDF1F0 (Light Pink)