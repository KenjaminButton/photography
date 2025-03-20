# Kenjamin Button Photography

A modern photography portfolio and blog built with Next.js 14, featuring secure admin authentication and dynamic content management.

## Features

- **Modern Stack**: Next.js 14, TypeScript, and Tailwind CSS
- **Secure Authentication**: NextAuth.js implementation with protected admin routes
- **Admin Dashboard**: Secure area for content management
- **Responsive Design**: Beautiful, mobile-first layout using Geist font
- **Blog System**: Coming soon - Dynamic blog post creation and management
- **Image Management**: Coming soon - Cloudinary integration for optimized image delivery

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
NEXTAUTH_SECRET=your_secure_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_hashed_password
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Security

- Passwords are securely hashed using bcrypt
- Protected admin routes with NextAuth.js
- Environment variables for sensitive data
- Session-based authentication

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Font**: Geist (by Vercel)

## Development Status

Currently implementing core features:
- Basic site structure
- Authentication system
- Admin dashboard
- Blog functionality
- Image management
- Portfolio layout

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - See LICENSE file for details
