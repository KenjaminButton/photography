# API Documentation

## Authentication Endpoints

### POST /api/auth/login
- Authenticates admin user
- Returns session cookie

### POST /api/auth/logout
- Clears admin session

## Post Management

### GET /api/posts
- Returns list of blog posts
- Public endpoint

### GET /api/posts/[id]
- Returns single post
- Public endpoint

### POST /api/posts
- Creates new post
- Protected endpoint
- Requires: title, content, images

### PUT /api/posts/[id]
- Updates existing post
- Protected endpoint

### DELETE /api/posts/[id]
- Deletes post
- Protected endpoint

## Image Management

### POST /api/upload
- Uploads image to Cloudinary
- Protected endpoint
- Returns image URL and details

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
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Error Codes
- `UNAUTHORIZED`: Authentication required
- `INVALID_INPUT`: Invalid request data
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server error
