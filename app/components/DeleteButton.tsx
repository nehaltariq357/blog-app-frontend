"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this post?");

    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    if (res.ok) {
      router.push("/blog");

      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="font-mono text-[11px] uppercase tracking-wide border border-[#B5362A] text-[#B5362A] px-4 py-2 rounded-full hover:bg-[#B5362A] hover:text-white transition-colors"
    >
      Delete
    </button>
  );
}