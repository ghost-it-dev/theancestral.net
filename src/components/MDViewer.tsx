'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';

const EditerMarkdown = dynamic(() =>
  import('@uiw/react-md-editor').then(mod => {
    return mod.default.Markdown;
  }),
);

function MDViewer({ text }: { text: string }) {
  return <EditerMarkdown source={text} />;
}

export default MDViewer;
