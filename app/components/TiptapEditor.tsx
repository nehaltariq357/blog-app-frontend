"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { createLowlight, common } from "lowlight";
import { useEffect } from "react";

const lowlight = createLowlight(common);

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,

        codeBlock: false,
      }),

      Placeholder.configure({
        placeholder: "Start writing your blog...",
      }),

      Link.configure({
        openOnClick: false,
      }),

      Image,

      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],

    // empty initialize
    content: "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    immediatelyRender: false,
  });

  // load old content in edit mode
  useEffect(() => {
    if (!editor) return;

    if (content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-[#DEDBD2] rounded-sm bg-white">
      <div className="border-b border-[#DEDBD2] px-3 py-2">
        <Toolbar editor={editor} />
      </div>

      <EditorContent
        editor={editor}
        className="px-5 py-4 min-h-[320px] text-[15px] leading-[1.75] text-[#2b2a27] font-mono
          prose max-w-none
          prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[#1A1917]
          prose-a:text-[#B5362A]
          prose-blockquote:border-l-2 prose-blockquote:border-[#B5362A] prose-blockquote:font-serif prose-blockquote:italic
          prose-code:text-[#B5362A] prose-code:bg-[#F6F5F1] prose-code:px-1 prose-code:rounded-sm
          [&_.ProseMirror]:outline-none
          [&_p.is-editor-empty:first-child::before]:text-[#9a988f]
          [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_p.is-editor-empty:first-child::before]:float-left
          [&_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}