"use client";

import { useState } from "react";

export default function CommentForm({
  postId,
  onCommentAdded,
}: {
  postId: number;
  onCommentAdded: () => void;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        text,
        postId,
      }),
    });

    const data = await res.json();

    console.log(data);

    setText("");

    setLoading(false);

    if (res.ok) {
      onCommentAdded();
    }
  }

  return (
    <div>
      <textarea
        className="w-full border border-[#DEDBD2] rounded-sm p-3 text-sm bg-white text-[#1A1917] placeholder:text-[#9a988f] outline-none focus:border-[#B5362A] resize-none"
        rows={3}
        placeholder="Write a comment…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-3 font-mono text-[11px] uppercase tracking-wide border border-[#1A1917] text-[#1A1917] px-5 py-2 rounded-full hover:bg-[#1A1917] hover:text-[#F6F5F1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Posting…" : "Comment"}
      </button>
    </div>
  );
}