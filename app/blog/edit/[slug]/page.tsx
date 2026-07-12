"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TiptapEditor from "../../../components/TiptapEditor";

export default function EditPost() {
  const router = useRouter();
  const params = useParams();

  const slug = params.slug as string;

  const [postId, setPostId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
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
      setVisibility(data.visibility);

      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  async function handleUpdate() {
    if (!postId) return;

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
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">
        Edit Blog
      </h1>

      <input
        className="border p-3 w-full mb-5 rounded"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="mb-5">
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div>

      <TiptapEditor
        content={content}
        onChange={setContent}
      />

      <button
        onClick={handleUpdate}
        className="mt-5 rounded bg-blue-600 px-5 py-2 text-white"
      >
        Update Post
      </button>
    </div>
  );
}