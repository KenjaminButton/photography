'use client';

import MDEditor from '@uiw/react-md-editor';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Remove escape characters and clean up newlines
  const cleanContent = content
    .replace(/\\n/g, '\n')  // Replace \n with actual newlines
    .replace(/^"|"$/g, ''); // Remove surrounding quotes

  return (
    <div data-color-mode="light" className="markdown-body p-6 rounded-lg bg-white shadow-sm">
      <MDEditor.Markdown source={cleanContent} />
    </div>
  );
}
