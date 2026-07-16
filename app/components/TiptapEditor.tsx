"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef } from "react";

import Toolbar from "./Toolbar";

import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const loaded = useRef(false);

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

    content: "",

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Load content only once
  useEffect(() => {
    if (!editor) return;

    if (!loaded.current && content) {
      editor.commands.setContent(content);
      loaded.current = true;
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="border border-[#DEDBD2] rounded-sm bg-white">
      <div className="border-b border-[#DEDBD2] px-3 py-2">
        <Toolbar editor={editor} />
      </div>

      <EditorContent
        editor={editor}
        className="
          [&_.ProseMirror]:min-h-[320px]
          [&_.ProseMirror]:p-5
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror]:leading-8
          [&_.ProseMirror]:text-[15px]
          [&_.ProseMirror]:font-mono

          [&_.ProseMirror_h1]:text-4xl
          [&_.ProseMirror_h1]:font-bold
          [&_.ProseMirror_h1]:mb-6

          [&_.ProseMirror_h2]:text-3xl
          [&_.ProseMirror_h2]:font-bold
          [&_.ProseMirror_h2]:mb-5

          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:ml-6

          [&_.ProseMirror_ol]:list-decimal
          [&_.ProseMirror_ol]:ml-6

          [&_.ProseMirror_img]:rounded-lg
          [&_.ProseMirror_img]:my-5
          [&_.ProseMirror_img]:max-w-full

          [&_.ProseMirror_pre]:bg-black
          [&_.ProseMirror_pre]:text-white
          [&_.ProseMirror_pre]:p-4
          [&_.ProseMirror_pre]:rounded-lg

          [&_.ProseMirror_code]:bg-gray-100
          [&_.ProseMirror_code]:px-1
          [&_.ProseMirror_code]:rounded

          [&_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_p.is-editor-empty:first-child::before]:text-gray-400
          [&_p.is-editor-empty:first-child::before]:pointer-events-none
          [&_p.is-editor-empty:first-child::before]:float-left
        "
      />
    </div>
  );
}