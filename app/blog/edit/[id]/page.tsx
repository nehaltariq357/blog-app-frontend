"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TiptapEditor from "../../../components/TiptapEditor";

export default function EditPost() {
    const router = useRouter();

    const params = useParams();

    const id = params.id as string;

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                credentials: "include",
            });

            const data = await res.json();

            setTitle(data.title);

            setContent(data.content);

            setLoading(false);
        }

        fetchPost();
    }, [id]);

    async function handleUpdate() {
        const res = await fetch(
            `http://localhost:5000/api/posts/${id}`,

            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                },

                credentials: "include",

                body: JSON.stringify({
                    title,

                    content,
                }),
            },
        );

        if (res.ok) {
            router.push(`/blog/${id}`);
        }
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-5">Edit Blog</h1>

            <input
                className="border p-3 w-full mb-5"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TiptapEditor content={content} onChange={setContent} />

            <button onClick={handleUpdate} className="mt-5 border px-5 py-2">
                Update Post
            </button>
        </div>
    );
}
