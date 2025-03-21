import { db } from '@/db/config';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  content: string | Record<string, unknown>;
  image_url: string | null;
  published_at: number | null;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  const result = await db.execute({
    sql: `
      SELECT id, title, content, image_url, published_at, slug 
      FROM posts 
      WHERE status = 'published' 
      ORDER BY published_at DESC
    `,
    args: []
  });
  
  // Transform the raw rows into properly typed Post objects
  return result.rows.map(row => ({
    id: String(row.id),
    title: String(row.title),
    content: typeof row.content === 'string' ? row.content : JSON.parse(String(row.content)),
    image_url: row.image_url ? String(row.image_url) : null,
    published_at: row.published_at ? Number(row.published_at) : null,
    slug: String(row.slug)
  }));
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#26294D] sm:text-5xl md:text-6xl">
          <span className="block">Kenjamin Button</span>
          <span className="block text-[#E092C1]">Photography</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-[#26294D] sm:text-lg md:mt-5 md:text-xl">
          Memories in a Click.
        </p>
      </header>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link 
                href={`/posts/${post.slug}`} 
                key={post.id}
                className="block group"
              >
                <article className="relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]">
                  <div className="aspect-[4/3] relative bg-[#26294D]/10">
                    {post.image_url && (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={posts.indexOf(post) === 0}
                      />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold text-[#26294D] hover:text-[#E092C1] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#26294D]/60">
                      {post.published_at ? new Date(post.published_at * 1000).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Date not available'}
                    </p>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-[#26294D]/80">No posts yet. Check back soon!</p>
          )}
        </div>
      </div>
    </main>
  );
}
