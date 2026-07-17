"use client";

import { useState } from "react";

export default function LikeButton({
  postId,
  initialLiked = false,
}: {
  postId: number;
  initialLiked?: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);

  const [loading, setLoading] = useState(false);

  async function handleLike() {
    try {
      setLoading(true);

      const url = liked
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/likes/${postId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/likes/${postId}`;

      const res = await fetch(url, {
        method: liked ? "DELETE" : "POST",

        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`font-mono text-[11px] uppercase tracking-wide px-4 py-2 rounded-full border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        liked
          ? "border-[#B5362A] bg-[#B5362A] text-white"
          : "border-[#1A1917] text-[#1A1917] hover:bg-[#1A1917] hover:text-[#F6F5F1]"
      }`}
    >
      {liked ? "♥ Unlike" : "♡ Like"}
    </button>
  );
}