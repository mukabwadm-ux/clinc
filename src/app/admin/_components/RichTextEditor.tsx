'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading2, Heading3, Undo2, Redo2 } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
  error?: string
}

export default function RichTextEditor({ value, onChange, error }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'min-h-[160px] px-4 py-3 text-sm outline-none leading-relaxed',
        style: 'color: #1A2B5E',
      },
    },
  })

  if (!editor) return null

  const tools = [
    {
      group: [
        { icon: <Heading2 size={14} />, label: 'H2', active: editor.isActive('heading', { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
        { icon: <Heading3 size={14} />, label: 'H3', active: editor.isActive('heading', { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
      ],
    },
    {
      group: [
        { icon: <Bold size={14} />, label: 'Bold', active: editor.isActive('bold'), action: () => editor.chain().focus().toggleBold().run() },
        { icon: <Italic size={14} />, label: 'Italic', active: editor.isActive('italic'), action: () => editor.chain().focus().toggleItalic().run() },
        { icon: <UnderlineIcon size={14} />, label: 'Underline', active: editor.isActive('underline'), action: () => editor.chain().focus().toggleUnderline().run() },
      ],
    },
    {
      group: [
        { icon: <List size={14} />, label: 'Bullet list', active: editor.isActive('bulletList'), action: () => editor.chain().focus().toggleBulletList().run() },
        { icon: <ListOrdered size={14} />, label: 'Ordered list', active: editor.isActive('orderedList'), action: () => editor.chain().focus().toggleOrderedList().run() },
      ],
    },
    {
      group: [
        { icon: <Undo2 size={14} />, label: 'Undo', active: false, action: () => editor.chain().focus().undo().run() },
        { icon: <Redo2 size={14} />, label: 'Redo', active: false, action: () => editor.chain().focus().redo().run() },
      ],
    },
  ]

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${error ? '#FCA5A5' : 'rgba(26,43,94,0.15)'}`, boxShadow: error ? '0 0 0 2px rgba(239,68,68,0.12)' : undefined }}>
      {/* Toolbar */}
      <div className="flex items-center gap-px px-2 py-1.5 flex-wrap" style={{ background: '#F8F9FB', borderBottom: '1px solid rgba(26,43,94,0.10)' }}>
        {tools.map((group, gi) => (
          <div key={gi} className={`flex items-center gap-px ${gi < tools.length - 1 ? 'pr-2 mr-2 border-r' : ''}`} style={{ borderColor: 'rgba(26,43,94,0.12)' }}>
            {group.group.map(t => (
              <button
                key={t.label}
                type="button"
                title={t.label}
                onClick={t.action}
                className="w-7 h-7 flex items-center justify-center rounded-md transition-all cursor-pointer"
                style={{
                  background: t.active ? 'rgba(245,166,35,0.15)' : 'transparent',
                  color: t.active ? '#B45309' : '#6B7A99',
                }}
                onMouseEnter={e => { if (!t.active) (e.currentTarget as HTMLElement).style.background = '#EDF2F7' }}
                onMouseLeave={e => { if (!t.active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                {t.icon}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Editor area */}
      <div className="bg-white prose prose-sm max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:my-1 [&_.ProseMirror_h2]:text-base [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h3]:text-sm [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
