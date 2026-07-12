"use client";

import { useRouter } from "next/navigation";

export default function EditButton({
  slug,
}: {
  slug: string;
}) {
  const router = useRouter();

  console.log("slug",slug)


  return (
    <button
      onClick={() => router.push(`/blog/edit/${slug}`)}
      className="rounded border px-4 py-2"
    >
      Edit
    </button>
  );
}