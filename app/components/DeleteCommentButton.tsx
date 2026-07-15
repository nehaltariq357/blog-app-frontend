"use client";

export default function DeleteCommentButton({
  id,
  refresh,
}: {
  id: number;
  refresh: () => void;
}) {
  async function deleteComment() {
    const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    if (res.ok) {
      refresh();
    }
  }

  return (
    <button
      onClick={deleteComment}
      className="font-mono text-[10.5px] uppercase tracking-wide text-[#B5362A] hover:text-[#93281e] shrink-0"
    >
      Delete
    </button>
  );
}