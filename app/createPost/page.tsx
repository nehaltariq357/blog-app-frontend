"use client";

import { useState } from "react";
import TiptapEditor from "../components/TiptapEditor";
import { useRouter } from "next/navigation";
import ImageUpload from "../components/ImageUpload";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async () => {
    console.log({
      title,
      content,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify({
        title,
        content,
        visibility: "PUBLIC",
        thumbnail, // Include the thumbnail URL in the request body
      }),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      router.push(`/blog/${data.slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-3xl mx-auto py-14 px-6">
        <span className="inline-block font-mono text-[10.5px] uppercase tracking-wider text-[#B5362A] border border-[#B5362A] rounded-sm px-2 py-1 -rotate-2 mb-4">
          New Post
        </span>

        <h1 className="font-serif font-bold text-3xl text-[#1A1917] mb-8">
          Create Blog
        </h1>

        <div className="border border-[#DEDBD2] rounded-sm bg-white">
          <div className="p-6 md:p-8">
            <input
              className="w-full font-serif font-bold text-2xl text-[#1A1917] placeholder:text-[#c8c5ba] outline-none mb-6 pb-4 border-b border-[#DEDBD2]"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="mb-8">
              <h2 className="font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67] mb-3">
                Featured Image
              </h2>

              <ImageUpload
                onUpload={(url) => setThumbnail(url)} // Pass the setThumbnail function
              />

              {/* // Display the uploaded image if available */}
              {thumbnail && (
                <img
                  src={thumbnail}
                  className="mt-4 w-full h-60 object-cover rounded-sm border border-[#DEDBD2]"
                />
              )}
            </div>

            <div className="mb-2">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex justify-end px-6 md:px-8 py-4 border-t border-[#DEDBD2] bg-[#F6F5F1]">
            <button
              onClick={handleSubmit}
              className="bg-[#B5362A] hover:bg-[#93281e] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}