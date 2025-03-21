'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';

export default function PostsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Post Management</h1>
            <Link
              href="/admin/posts/new"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create New Post
            </Link>
          </div>
          
          <div className="mt-4 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-gray-600">
                {/* We'll add the posts list here later */}
                No posts yet. Click "Create New Post" to get started.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
