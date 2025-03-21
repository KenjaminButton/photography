# API Documentation

## Authentication Endpoints

### POST /api/auth/signin
- Authenticates admin user
- Returns session token
- Required fields:
  - email: Admin email
  - password: Admin password

### POST /api/auth/signout
- Clears admin session

## Post Management

### GET /api/posts
- Returns list of blog posts
- Public endpoint
- Query parameters:
  - status: Filter by post status (published/draft)
- Response includes:
  - id
  - title
  - slug
  - status
  - published_at
  - image_url

### GET /api/posts/[slug]
- Returns single post by slug
- Public endpoint
- Response includes:
  - id
  - title
  - slug
  - content
  - status
  - published_at
  - image_url

### POST /api/posts
- Creates new post
- Protected endpoint (admin only)
- Required fields:
  - title: string
  - content: JSON
  - status: 'published' | 'draft'
  - imageUrl?: string
  - publishedAt?: number (Unix timestamp)

### DELETE /api/posts?id=[id]
- Deletes post by ID
- Protected endpoint (admin only)
- Query parameters:
  - id: Post ID to delete

## Image Management

### POST /api/images
- Uploads image to Cloudinary
- Protected endpoint (admin only)
- Request:
  - Multipart form data with 'file' field
- Response:
  - url: string (Cloudinary URL)
  - width: number
  - height: number
  - format: string

## Response Formats

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400 | 401 | 403 | 404 | 500
}
```

## Error Codes
- 400: Bad Request - Invalid input data
- 401: Unauthorized - Authentication required
- 403: Forbidden - Insufficient permissions
- 404: Not Found - Resource doesn't exist
- 500: Internal Server Error

## Authentication
All protected endpoints require:
1. Valid session cookie from /api/auth/signin
2. Request must originate from authenticated admin session

## Rate Limiting
- Default Next.js rate limiting applies
- Consider implementing custom rate limiting for production
