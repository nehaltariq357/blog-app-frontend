"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ slug }: { slug: string }) {
  const router = useRouter();

  console.log("slug", slug);

  return (
    <button
      onClick={() => router.push(`/blog/edit/${slug}`)}
      className="font-mono text-[11px] uppercase tracking-wide border border-[#1A1917] text-[#1A1917] px-4 py-2 rounded-full hover:bg-[#1A1917] hover:text-[#F6F5F1] transition-colors"
    >
      Edit
    </button>
  );
}