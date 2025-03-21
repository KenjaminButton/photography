import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/config';
import { validateMethod, withAdmin } from '@/lib/auth';

// GET a single post by slug (public)
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await db.execute(`
      SELECT id, title, slug, content, published_at, created_at, updated_at
      FROM posts
      WHERE slug = ? AND status = 'published'
    `, [params.slug]);

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
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    return await withAdmin(async () => {
      validateMethod(req, ['PUT']);
      
      const body = await req.json();
      const { title, content, status } = body;
      
      if (!title || !content) {
        return NextResponse.json(
          { error: 'Title and content are required' },
          { status: 400 }
        );
      }

      // Generate new slug if title changed
      const slug = title.toLowerCase()
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
        slug,
        status || 'draft',
        status === 'published' ? 'unixepoch()' : null,
        params.slug
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
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    return await withAdmin(async () => {
      validateMethod(req, ['DELETE']);

      const result = await db.execute(`
        DELETE FROM posts 
        WHERE slug = ?
        RETURNING id
      `, [params.slug]);

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