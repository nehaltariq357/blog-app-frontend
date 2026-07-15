"use client";

import { useState } from "react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function BlogComments({ postId }: { postId: number }) {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-wide text-[#6F6E67] mb-5">
        Comments
      </h2>

      <div className="mb-8">
        <CommentForm
          postId={postId}
          onCommentAdded={() => {
            setRefresh(refresh + 1);
          }}
        />
      </div>

      <CommentList key={refresh} postId={postId} />
    </div>
  );
}