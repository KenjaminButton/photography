'use client';

import { useState } from 'react';

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
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

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setResult(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Test Image Upload</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border p-2"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!file}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Upload
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-2">
          <h2 className="text-xl">Upload Success!</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p>URL: {result.url}</p>
            <p>Public ID: {result.publicId}</p>
          </div>
          <img 
            src={result.url} 
            alt="Uploaded" 
            className="mt-4 max-w-md rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
