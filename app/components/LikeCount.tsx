"use client";

import { useEffect, useState } from "react";

export default function LikeCount({ postId }: { postId: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getLikes() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/likes/count`);

      const data = await res.json();

      const post = data.likes.find((post: any) => post.id === postId);

      if (post) {
        setCount(post._count.likes);
      }
    }

    getLikes();
  }, [postId]);

  return (
    <span className="font-mono text-[11px] uppercase tracking-wide text-[#6F6E67]">
      ♥ {count}
    </span>
  );
}