import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/config';
import { validateMethod, withAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const result = await db.execute(`
      SELECT id, title, slug, content, image_url, status, published_at, created_at, updated_at
      FROM posts
      ORDER BY 
        CASE 
          WHEN status = 'published' THEN published_at 
          ELSE created_at 
        END DESC
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await withAdmin(async () => {
      validateMethod(req, ['POST']);
      
      const body = await req.json();
      const { title, content, imageUrl, status, publishedAt } = body;
      
      if (!title || !content) {
        return NextResponse.json(
          { error: 'Title and content are required' },
          { status: 400 }
        );
      }

      // Validate status
      if (status && !['draft', 'published'].includes(status)) {
        return NextResponse.json(
          { error: 'Status must be either draft or published' },
          { status: 400 }
        );
      }

      // Validate publishedAt if status is published
      if (status === 'published' && !publishedAt) {
        return NextResponse.json(
          { error: 'Published date is required for published posts' },
          { status: 400 }
        );
      }

      // Generate a URL-friendly slug from the title
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Convert publishedAt to Unix timestamp (seconds)
      const publishedAtTimestamp = status === 'published' 
        ? Math.floor(new Date(publishedAt).getTime() / 1000)
        : null;

      // Insert the post
      await db.execute(`
        INSERT INTO posts (
          id, title, slug, content, image_url, status, published_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        crypto.randomUUID(),
        title,
        slug,
        JSON.stringify(content),
        imageUrl || null,
        status || 'draft',
        publishedAtTimestamp
      ]);

      return NextResponse.json({ success: true }, { status: 201 });
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('Failed to create post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    return await withAdmin(async () => {
      validateMethod(req, ['DELETE']);
      
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');
      
      if (!id) {
        return NextResponse.json(
          { error: 'Post ID is required' },
          { status: 400 }
        );
      }

      // Delete the post
      await db.execute('DELETE FROM posts WHERE id = ?', [id]);

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