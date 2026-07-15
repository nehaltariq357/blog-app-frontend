"use client";

import { Editor } from "@tiptap/react";
import { useState } from "react";
import { useRef } from "react";

const btnBase =
  "font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full transition-colors";
const btnActive = `${btnBase} bg-[#1A1917] text-[#F6F5F1]`;
const btnInactive = `${btnBase} border border-[#DEDBD2] text-[#6F6E67] hover:border-[#1A1917] hover:text-[#1A1917]`;

export default function Toolbar({ editor }: { editor: Editor }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState("");

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
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
      ?.chain()
      .focus()
      .setImage({
        src: data.secure_url,
      })
      .run();
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

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
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? btnActive : btnInactive}
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? btnActive : btnInactive}
      >
        I
      </button>

      {/* Heading 1 */}
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={
          editor.isActive("heading", { level: 1 }) ? btnActive : btnInactive
        }
      >
        H1
      </button>

      {/* Heading 2 */}
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={
          editor.isActive("heading", { level: 2 }) ? btnActive : btnInactive
        }
      >
        H2
      </button>

      {/* Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? btnActive : btnInactive}
      >
        • List
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? btnActive : btnInactive}
      >
        1. List
      </button>

      {/* Link */}
      <button
        onClick={addLink}
        className={editor.isActive("link") ? btnActive : btnInactive}
      >
        🔗 Link
      </button>

      {/* Code Block */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? btnActive : btnInactive}
      >
        {"</>"}
      </button>

      {/* // Image */}
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Image URL");

          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className={btnInactive}
      >
        Image
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
        onClick={() => inputRef.current?.click()}
        className={btnInactive}
      >
        Image
      </button>
    </div>
  );
}