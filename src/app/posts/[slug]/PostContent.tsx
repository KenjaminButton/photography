'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

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

function PostContent({ post }: { post: Post }) {
  const [showModal, setShowModal] = useState(false);

  const formattedDate = post.published_at 
    ? new Date(post.published_at * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-[#26294D] hover:text-[#B9A1E4] mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
        
        <article>
          <h1 className="text-4xl font-bold text-[#26294D] mb-4">{post.title}</h1>
          
          {formattedDate && (
            <div className="mb-8 text-sm text-[#26294D]/60">
              {formattedDate}
            </div>
          )}
          
          {post.image_url && (
            <>
              <div 
                style={{ height: '400px' }}
                className="relative w-full mb-8 cursor-pointer h-[400px]"
                onClick={() => setShowModal(true)}
              >
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg hover:opacity-95 transition-opacity"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              {showModal && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowModal(false)}
                >
                  <div className="relative w-full max-w-6xl max-h-[90vh] aspect-[16/9]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="100vw"
                      priority
                    />
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="prose prose-lg max-w-none text-[#26294D]">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}

export default PostContent;