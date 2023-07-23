'use client'
import MDEditor from '@uiw/react-md-editor';

function MDViewer({ text }: { text: string }) {
	return (
		<MDEditor.Markdown source={text} />
	)
}

export default MDViewer