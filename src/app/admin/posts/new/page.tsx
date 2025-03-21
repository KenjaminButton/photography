'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import AdminNav from '../../../../components/AdminNav';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function NewPost() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [postStatus, setPostStatus] = useState<'draft' | 'published'>('draft');
  const [publishedAt, setPublishedAt] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  if (sessionStatus === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      
      // Step 1: Upload image to Cloudinary if one is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        
        const imageResponse = await fetch('/api/images', {
          method: 'POST',
          body: formData,
        });
        
        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const imageData = await imageResponse.json();
        imageUrl = imageData.url;
      }

      // Step 2: Create the post with the Cloudinary URL
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          status: postStatus,
          publishedAt: postStatus === 'published' ? publishedAt : null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      router.push('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
            <Link
              href="/admin/posts"
              className="bg-[#26294D] hover:bg-[#B9A1E4] text-white font-bold py-2 px-4 rounded"
            >
              Back to Posts
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-[#26294D] font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26294D] text-[#26294D]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-[#26294D] font-medium mb-2">
                    Content
                  </label>
                  <MarkdownEditor
                    value={content}
                    onChange={setContent}
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-[#26294D] font-medium mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 text-[#26294D]"
                  />
                  {imagePreview && (
                    <div className="mt-4 relative w-full h-[300px]">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-6">
                  <div className="flex-1">
                    <label htmlFor="status" className="block text-[#26294D] font-medium mb-2">
                      Status
                    </label>
                    <select
                      id="status"
                      value={postStatus}
                      onChange={(e) => setPostStatus(e.target.value as 'draft' | 'published')}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26294D] text-[#26294D]"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  {postStatus === 'published' && (
                    <div className="flex-1">
                      <label htmlFor="publishedAt" className="block text-[#26294D] font-medium mb-2">
                        Publish Date
                      </label>
                      <input
                        type="datetime-local"
                        id="publishedAt"
                        value={publishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#26294D] text-[#26294D]"
                        required={postStatus === 'published'}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/posts')}
                    className="px-6 py-2 rounded-md text-gray-600 bg-white hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-md bg-[#26294D] hover:bg-[#B9A1E4] text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#26294D] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
