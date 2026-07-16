"use client";

import { Editor } from "@tiptap/react";
import { useRef } from "react";

const btnBase =
  "font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full transition-colors";

const btnActive = `${btnBase} bg-[#1A1917] text-[#F6F5F1]`;

const btnInactive = `${btnBase} border border-[#DEDBD2] text-[#6F6E67] hover:border-[#1A1917] hover:text-[#1A1917]`;

export default function Toolbar({
  editor,
}: {
  editor: Editor;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const prevent = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  async function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "blog_upload1");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/saz161ir/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    editor
      .chain()
      .focus()
      .setImage({
        src: data.secure_url,
      })
      .run();
  }

  const addLink = () => {
    const previousUrl =
      editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl
    );

    if (url === null) return;

    if (url === "") {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

return (
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => editor.chain().focus().toggleBold().run()}
      className={editor.isActive("bold") ? btnActive : btnInactive}
    >
      B
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      className={editor.isActive("italic") ? btnActive : btnInactive}
    >
      I
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() =>
        editor.chain().focus().toggleHeading({ level: 1 }).run()
      }
      className={
        editor.isActive("heading", { level: 1 })
          ? btnActive
          : btnInactive
      }
    >
      H1
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() =>
        editor.chain().focus().toggleHeading({ level: 2 }).run()
      }
      className={
        editor.isActive("heading", { level: 2 })
          ? btnActive
          : btnInactive
      }
    >
      H2
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      className={
        editor.isActive("bulletList")
          ? btnActive
          : btnInactive
      }
    >
      • List
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      className={
        editor.isActive("orderedList")
          ? btnActive
          : btnInactive
      }
    >
      1. List
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={addLink}
      className={
        editor.isActive("link")
          ? btnActive
          : btnInactive
      }
    >
      🔗 Link
    </button>

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={
        editor.isActive("codeBlock")
          ? btnActive
          : btnInactive
      }
    >
      {"</>"}
    </button>

    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      hidden
      onChange={handleImage}
    />

    <button
      type="button"
      onMouseDown={prevent}
      onClick={() => inputRef.current?.click()}
      className={btnInactive}
    >
      Image
    </button>
  </div>
);
}