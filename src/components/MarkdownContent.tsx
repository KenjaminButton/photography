'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cleanContent = content
    .replace(/\\n/g, '\n')
    .replace(/^"|"$/g, '')
    .replace(/\\"/g, '"');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .markdown-body {
        font-family: var(--font-geist-sans);
      }
      
      .markdown-body h1,
      .markdown-body h2,
      .markdown-body h3,
      .markdown-body h4,
      .markdown-body h5,
      .markdown-body h6 {
        font-family: var(--font-geist-sans);
        color: #26294D;
        margin-top: 2rem;
        margin-bottom: 1rem;
        line-height: 1.3;
      }

      .markdown-body p {
        margin-bottom: 1.5rem;
      }

      .markdown-body img {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }

      .modal-overlay {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className="markdown-body p-6 rounded-lg bg-white shadow-sm" data-color-mode="light">
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]}
          components={{
            iframe: (props) => {
              if (!props.src) return null;
              return <iframe {...props} style={{ border: 0 }} />;
            },
            img: ({ src, alt }) => {
              // Handle markdown image syntax with ![]()
              if (typeof src === 'string' && src.startsWith('![')) {
                const match = src.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <img
                      src={match[2]}
                      alt={match[1]}
                      className="w-full max-h-[400px] object-cover rounded-lg hover:opacity-95 transition-opacity my-8 cursor-pointer"
                      onClick={() => setSelectedImage(match[2] || null)}
                      loading="lazy"
                    />
                  );
                }
              }
              return (
                <img
                  src={src}
                  alt={alt}
                  className="w-full max-h-[400px] object-cover rounded-lg hover:opacity-95 transition-opacity my-8 cursor-pointer"
                  onClick={() => setSelectedImage(src || null)}
                  loading="lazy"
                />
              );
            }
          }}
        >
          {cleanContent}
        </ReactMarkdown>
      </div>

      {selectedImage && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
