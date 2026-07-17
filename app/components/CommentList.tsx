"use client";

import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ postId }: { postId: number }) {
  const [comments, setComments] = useState<any[]>([]);

  async function fetchComments() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`, {
      cache: "no-store",
    });

    const data = await res.json();

    setComments(data);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-wide text-[#6F6E67] mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} refresh={fetchComments} />
        ))}
      </div>
    </div>
  );
}