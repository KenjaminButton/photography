import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/config';
import { validateMethod, withAdmin } from '@/lib/auth';

// GET a single post by slug or id (public for published, admin for drafts)
export async function GET(request: NextRequest) {
  try {
    const param = request.nextUrl.pathname.split('/').pop();
    if (!param) {
      return NextResponse.json({ error: 'Identifier is required' }, { status: 400 });
    }

    // Check if it's an admin request (has valid session)
    const isAdmin = await withAdmin(async () => true).catch(() => false);

    // For admin, get any post by ID
    if (isAdmin) {
      const result = await db.execute(`
        SELECT id, title, slug, content, status, published_at, created_at, updated_at
        FROM posts
        WHERE id = ?
      `, [param]);

      if (result.rows.length > 0) {
        return NextResponse.json(result.rows[0]);
      }
    }

    // For public or fallback, only get published posts by slug
    const result = await db.execute(`
      SELECT id, title, slug, content, status, published_at, created_at, updated_at
      FROM posts
      WHERE slug = ? AND status = 'published'
    `, [param]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT to update a post (admin only)
export async function PUT(request: NextRequest) {
  try {
    return await withAdmin(async () => {
      validateMethod(request, ['PUT']);
      
      // Get slug from URL
      const slug = request.nextUrl.pathname.split('/').pop();
      if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
      }

      const body = await request.json();
      const { title, content, status } = body;
      
      if (!title || !content) {
        return NextResponse.json(
          { error: 'Title and content are required' },
          { status: 400 }
        );
      }

      // Generate new slug if title changed
      const newSlug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Update the post
      const result = await db.execute(`
        UPDATE posts 
        SET title = ?, 
            content = ?,
            slug = ?,
            status = ?,
            published_at = ?,
            updated_at = unixepoch()
        WHERE slug = ?
        RETURNING *
      `, [
        title,
        JSON.stringify(content),
        newSlug,
        status || 'draft',
        status === 'published' ? 'unixepoch()' : null,
        slug
      ]);

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json(result.rows[0]);
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Failed to update post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE a post (admin only)
export async function DELETE(request: NextRequest) {
  try {
    return await withAdmin(async () => {
      validateMethod(request, ['DELETE']);

      // Get slug from URL
      const slug = request.nextUrl.pathname.split('/').pop();
      if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
      }

      const result = await db.execute(`
        DELETE FROM posts 
        WHERE slug = ?
        RETURNING id
      `, [slug]);

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Failed to delete post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}