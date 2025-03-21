import { db } from '@/db/config';
import Link from 'next/link';

async function getPosts() {
  const result = await db.execute(`
    SELECT id, title, content, image_url, published_at, slug 
    FROM posts 
    WHERE status = 'published' 
    ORDER BY published_at DESC
  `);
  return result.rows;
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
                  <div className="aspect-[4/3] bg-[#26294D]/10">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-[#26294D]">{post.title}</h2>
                    <p className="mt-2 text-[#26294D]/80">
                      {typeof post.content === 'string' 
                        ? post.content.substring(0, 150) + '...'
                        : JSON.stringify(post.content).substring(0, 150) + '...'}
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
