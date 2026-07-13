"use client";

import { useState } from "react";
import TiptapEditor from "../components/TiptapEditor";
import { useRouter } from "next/navigation";
import ImageUpload from "../components/ImageUpload";

export default function CreatePost() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const handleSubmit = async () => {
        console.log({
            title,
            content,
        });

        const res = await fetch("http://localhost:5000/api/posts", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
                title,
                content,
                visibility: "PUBLIC",
                thumbnail, // Include the thumbnail URL in the request body
            }),
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            router.push(`/blog/${data.slug}`);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl">Create Blog</h1>

            <input
                className="border p-2 w-full"
                placeholder="Blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <ImageUpload
                onUpload={(url) => setThumbnail(url)} // Pass the setThumbnail function
            />

            {/* // Display the uploaded image if available */}
            {thumbnail && (
                <img src={thumbnail} className="mt-5 w-full h-60 object-cover" />
            )}

            <TiptapEditor content={content} onChange={setContent} />

            <button onClick={handleSubmit} className="mt-4 border px-5 py-2">
                Publish
            </button>
        </div>
    );
}
