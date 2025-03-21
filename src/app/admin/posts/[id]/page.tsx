'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminNav from '../../../../components/AdminNav';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function EditPost({ params, searchParams }: PageProps) {
  const { status } = useSession();
  const router = useRouter();
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        setPostId(resolvedParams.id);
      } catch (error) {
        console.error('Error loading params:', error);
        router.push('/admin/posts');
      }
    };

    loadData();
  }, [params, router]);

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  if (!postId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
            <Link
              href="/admin/posts"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Posts
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-gray-600">
                {/* We'll add the post editing form here later */}
                Editing post ID: {postId}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
