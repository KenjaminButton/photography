'use client';

import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div data-color-mode="light" className="mb-4">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        height={400}
        preview="live"
        hideToolbar={false}
        enableScroll={true}
      />
    </div>
  );
}
