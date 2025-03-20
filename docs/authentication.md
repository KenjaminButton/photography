# Authentication System

## Overview
Simple, secure authentication system for single-user admin access.

## Implementation

### 1. Protected Routes
- All `/admin/*` routes are protected
- Middleware-based authentication
- Session-based persistence

### 2. Security Measures
- Environment variable based password
- Secure session handling
- CSRF protection
- Rate limiting on login attempts

### 3. Admin Features
- Login page
- Protected dashboard
- Secure image upload
- Post management

## Code Structure

```typescript
// Middleware protection
export function middleware(request: NextRequest) {
  // Check protected routes
  // Verify session
  // Handle redirects
}

// Protected API routes
export async function POST(req: Request) {
  // Verify admin session
  // Handle admin operations
}
```

## Testing Authentication

1. **Access Control**
   - Verify public routes accessible
   - Confirm protected routes require auth
   - Test invalid access attempts

2. **Session Management**
   - Verify session persistence
   - Test session expiration
   - Check secure cookie handling

3. **Security Testing**
   - Rate limit verification
   - CSRF token validation
   - Password security checks
