"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your blog....",
      }),
    ],
    content: content ,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // 🔥 IMPORTANT
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor]);

  return (
    <div className="border rounded p-3">
      <EditorContent editor={editor} />
    </div>
  );
}