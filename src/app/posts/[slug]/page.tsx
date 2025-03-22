import { db } from '@/db/config';
import { notFound } from 'next/navigation';
import PostContent from './PostContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url: string | null;
  status: 'draft' | 'published';
  published_at: number | null;
  created_at: number;
  updated_at: number;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM posts WHERE slug = ? AND status = ?',
      args: [slug, 'published'],
    });

    if (!result.rows[0]) {
      return null;
    }

    const row = result.rows[0];
    
    return {
      id: String(row.id),
      title: String(row.title),
      slug: String(row.slug),
      content: String(row.content),
      image_url: row.image_url ? String(row.image_url) : null,
      status: row.status as 'draft' | 'published',
      published_at: row.published_at ? Number(row.published_at) : null,
      created_at: Number(row.created_at),
      updated_at: Number(row.updated_at)
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return <PostContent post={post} />;
}