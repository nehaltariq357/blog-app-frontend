"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TiptapEditor from "../../../components/TiptapEditor";
import ImageUpload from "../../../components/ImageUpload";

export default function EditPost() {
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string;

  const [postId, setPostId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/${slug}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        console.log(data);

        setPostId(data.id);
        setTitle(data.title);
        setContent(data.content);
        setThumbnail(data.thumbnail || "");
        setVisibility(data.visibility);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPost();
  }, [slug]);

  async function handleUpdate() {
    if (!postId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title,
            content,
            thumbnail,
            visibility,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        router.push(`/blog/${data.slug}`);
      } else {
        alert(data.message || "Failed to update post");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex items-center justify-center">
        <h1 className="font-mono text-sm uppercase tracking-wide text-[#6F6E67]">
          Loading…
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-3xl mx-auto py-14 px-6">
        <span className="inline-block font-mono text-[10.5px] uppercase tracking-wider text-[#B5362A] border border-[#B5362A] rounded-sm px-2 py-1 -rotate-2 mb-4">
          Editing
        </span>

        <h1 className="font-serif font-bold text-3xl text-[#1A1917] mb-8">
          Edit Blog
        </h1>

        <div className="border border-[#DEDBD2] rounded-sm bg-white">
          <div className="p-6 md:p-8">
            <input
              className="w-full font-serif font-bold text-2xl text-[#1A1917] placeholder:text-[#c8c5ba] outline-none mb-6 pb-4 border-b border-[#DEDBD2]"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="mb-8 flex items-center gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67]">
                Visibility
              </span>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="border border-[#DEDBD2] text-sm px-3 py-1.5 rounded-full bg-[#F6F5F1] text-[#1A1917] outline-none"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>

            {/* Current Thumbnail */}
            <div className="mb-8">
              <h2 className="font-mono text-[10.5px] uppercase tracking-wide text-[#6F6E67] mb-3">
                Featured Image
              </h2>

              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="w-full h-72 object-cover rounded-sm border border-[#DEDBD2] mb-4"
                />
              ) : (
                <p className="text-sm text-[#6F6E67] mb-4">
                  No image uploaded
                </p>
              )}

              <ImageUpload onUpload={setThumbnail} />

              <p className="text-xs text-[#6F6E67] mt-2">
                Upload a new image only if you want to replace the current one.
              </p>
            </div>

            <div className="mb-2">
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>

          <div className="flex justify-end px-6 md:px-8 py-4 border-t border-[#DEDBD2] bg-[#F6F5F1]">
            <button
              onClick={handleUpdate}
              className="bg-[#B5362A] hover:bg-[#93281e] text-white text-sm font-medium px-6 py-3 rounded-full transition-colors"
            >
              Update Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}