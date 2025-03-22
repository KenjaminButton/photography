'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminNav from '../../../../../components/AdminNav';
import MarkdownEditor from '../../../../../components/MarkdownEditor';

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: string;
  published_at?: string;
}

interface FormState {
  title: string;
  content: string;
  published_at?: string;
}

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [formState, setFormState] = useState<FormState>({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (status !== 'authenticated') return;
      
      try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        if (!id) return;

        const response = await fetch(`/api/posts/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        console.log('Fetched post data:', data);
        
        setPost(data);
        setFormState({
          title: data.title || '',
          content: data.content || '',
          published_at: data.published_at
        });
      } catch (error) {
        console.error('Error:', error);
        router.push('/admin/posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params, router, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formState.title,
          content: formState.content,
          status: 'published',
          published_at: formState.published_at
        }),
      });

      if (!response.ok) throw new Error('Failed to update post');
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not published yet';
    return new Date(parseInt(dateString) * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formState.title}
                onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <MarkdownEditor 
                value={formState.content} 
                onChange={(value) => setFormState(prev => ({ ...prev, content: value }))}
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <strong>Published:</strong> {formatDate(formState.published_at)}
              </p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
