'use client';

import { useState } from 'react';
import Image from 'next/image';

interface UploadResult {
  url: string;
  publicId: string;
}

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setResult(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Image Upload</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </div>
        
        <button
          type="submit"
          disabled={!file}
          className="bg-[#26294D] text-white px-4 py-2 rounded hover:bg-[#B9A1E4] disabled:opacity-50"
        >
          Upload Image
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Upload Result:</h2>
          <div className="relative w-full h-[400px] mb-4">
            <Image
              src={result.url}
              alt="Uploaded image"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
