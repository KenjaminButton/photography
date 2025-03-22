'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Remove escape characters and clean up newlines
  const cleanContent = content
    .replace(/\\n/g, '\n')  // Replace \n with actual newlines
    .replace(/^"|"$/g, '')  // Remove surrounding quotes
    .replace(/\\"/g, '"');  // Replace escaped quotes with regular quotes

  // Add custom styles for markdown content
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
            img: ({ src, alt, ...props }) => {
              // Handle markdown image syntax with ![]()
              if (typeof src === 'string' && src.startsWith('![')) {
                const match = src.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <figure className="my-8" onClick={() => setSelectedImage(match[2] || null)}>
                      <Image
                        src={match[2]}
                        alt={match[1]}
                        width={1200}
                        height={675}
                        className="w-full object-cover rounded-lg hover:opacity-95 transition-opacity"
                        priority
                        {...props}
                      />
                    </figure>
                  );
                }
              }
              return (
                <figure className="my-8" onClick={() => setSelectedImage(src || null)}>
                  <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={675}
                    className="w-full object-cover rounded-lg hover:opacity-95 transition-opacity"
                    priority
                    {...props}
                  />
                </figure>
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
