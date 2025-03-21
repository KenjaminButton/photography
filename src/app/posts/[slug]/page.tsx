import { db } from '@/db/config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Post {
  published_at: number | null;
  title: string;
  content: string;
  image_url?: string | null;
  [key: string]: any;
}

async function getPost(slug: string): Promise<Post | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM posts WHERE slug = ? AND status = ?',
    args: [slug, 'published']
  });
  
  if (!result.rows[0]) return null;
  
  const row = result.rows[0];
  return {
    published_at: row.published_at ? Number(row.published_at) : null,
    title: String(row.title),
    content: String(row.content),
    image_url: row.image_url ? String(row.image_url) : null,
    ...row
  };
}

export default async function Post({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate = post.published_at 
    ? new Date(post.published_at * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="inline-block mb-8 text-[#26294D] hover:text-[#E092C1] transition-colors"
        >
          ← Back to Gallery
        </Link>
        
        <article>
          <h1 className="text-4xl font-bold text-[#26294D] mb-8">{post.title}</h1>
          
          {post.image_url && (
            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none text-[#26294D]">
            {typeof post.content === 'string' 
              ? post.content
              : JSON.stringify(post.content)}
          </div>
          
          {formattedDate && (
            <div className="mt-8 text-[#26294D]/60">
              Published on {formattedDate}
            </div>
          )}
        </article>
      </div>
    </main>
  );
}