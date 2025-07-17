'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { Iframe } from './iFrame'
import { useEffect } from 'react'
import './pitcheditor.css'

export default function PitchEditor({
  content,
  onContentChange,
}: {
  content: string
  onContentChange: (html: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      Iframe,
      Placeholder.configure({
        placeholder: 'Tell your story here...',
      }),
    ],
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML()
      onContentChange(html)
    },
     immediatelyRender: false,
  })

  const handleAddImage = () => {
    const url = prompt('Görsel URL girin:')
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }

  const handleAddLink = () => {
    const url = prompt('Bağlantı URL girin:')
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  const handleEmbedVideo = () => {
    const rawUrl = prompt('YouTube veya iframe URL girin:')
    if (rawUrl) {
      const embedUrl = convertYouTubeToEmbed(rawUrl)
      editor?.chain().focus().insertContent({
        type: 'iframe',
        attrs: {
          src: embedUrl,
          width: '560',
          height: '315',
          frameborder: '0',
          allowfullscreen: 'true',
        },
      }).run()
    }
  }

  const convertYouTubeToEmbed = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
    return url
  }

  if (!editor) return null

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>"Quote"</button>
        <button onClick={handleAddLink}>🔗 Link</button>
        <button onClick={handleAddImage}>🖼️ Image</button>
        <button onClick={handleEmbedVideo}>🎬 Embed Video</button>
      </div>

      <div className="editor-box">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
