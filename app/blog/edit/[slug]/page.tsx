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
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold mb-6">
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

      {/* Current Thumbnail */}

      <div className="mb-6">
        <h2 className="font-semibold mb-2">
          Featured Image
        </h2>

        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="w-full h-72 object-cover rounded-lg border mb-4"
          />
        ) : (
          <p className="text-gray-500 mb-4">
            No image uploaded
          </p>
        )}

        <ImageUpload onUpload={setThumbnail} />

        <p className="text-sm text-gray-500 mt-2">
          Upload a new image only if you want to replace the current one.
        </p>
      </div>

      <div className="mb-6">
        <TiptapEditor
          content={content}
          onChange={setContent}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
      >
        Update Post
      </button>
    </div>
  );
}