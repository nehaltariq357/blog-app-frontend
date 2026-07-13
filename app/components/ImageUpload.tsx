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
        <div>
            <input type="file" accept="image/*" onChange={uploadImage} />

            {loading && <p>Uploading...</p>}
        </div>
    );
}
