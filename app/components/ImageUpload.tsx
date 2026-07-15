"use client";

import { useState } from "react";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "blog_upload1");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/saz161ir/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    console.log(data);

    onUpload(data.secure_url);

    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        className="text-sm text-[#6F6E67]
          file:mr-3 file:font-mono file:text-[11px] file:uppercase file:tracking-wide
          file:border file:border-[#1A1917] file:rounded-full file:px-4 file:py-2
          file:bg-transparent file:text-[#1A1917] hover:file:bg-[#1A1917] hover:file:text-[#F6F5F1]
          file:transition-colors file:cursor-pointer"
      />

      {loading && (
        <p className="font-mono text-[11px] uppercase tracking-wide text-[#B5362A]">
          Uploading…
        </p>
      )}
    </div>
  );
}