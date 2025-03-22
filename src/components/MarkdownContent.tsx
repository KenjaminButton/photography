'use client';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useEffect } from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Debug the content
  useEffect(() => {
    console.log('Raw content:', content);
  }, [content]);

  // Remove escape characters and clean up newlines
  const cleanContent = content
    .replace(/\\n/g, '\n')  // Replace \n with actual newlines
    .replace(/^"|"$/g, '')  // Remove surrounding quotes
    .replace(/\\"/g, '"');  // Replace escaped quotes with regular quotes

  // Debug the cleaned content
  useEffect(() => {
    console.log('Cleaned content:', cleanContent);
  }, [cleanContent]);

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

      .markdown-body h1 {
        font-size: 2.5rem;
        font-weight: 700;
      }

      .markdown-body h2 {
        font-size: 2rem;
        font-weight: 600;
      }

      .markdown-body p {
        font-size: 1.125rem;
        line-height: 1.75;
        margin: 1.5rem 0;
        color: #4A5568;
      }

      .markdown-body code {
        font-family: var(--font-geist-mono);
        background: #F7FAFC;
        padding: 0.2em 0.4em;
        border-radius: 0.25rem;
        font-size: 0.875em;
      }

      .markdown-body pre code {
        background: transparent;
        padding: 0;
      }

      .markdown-body blockquote {
        border-left: 4px solid #26294D;
        padding-left: 1rem;
        font-style: italic;
        color: #4A5568;
      }

      .markdown-body img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 2rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .markdown-body iframe {
        display: block;
        max-width: 100%;
        margin: 2rem auto;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .markdown-body ul,
      .markdown-body ol {
        padding-left: 1.5rem;
        margin: 1.5rem 0;
      }

      .markdown-body li {
        margin: 0.5rem 0;
        color: #4A5568;
      }

      .markdown-body hr {
        border: 0;
        border-top: 2px solid #E2E8F0;
        margin: 2rem 0;
      }

      .markdown-body a {
        color: #26294D;
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="markdown-body p-6 rounded-lg bg-white shadow-sm" data-color-mode="light">
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          iframe: (props) => {
            if (!props.src) return null;
            return <iframe {...props} style={{ border: 0 }} />;
          }
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
