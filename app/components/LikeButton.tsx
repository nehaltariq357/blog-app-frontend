"use client";

import { useState } from "react";

export default function LikeButton({
    postId,
    initialLiked = false,
}: {
    postId: number;
    initialLiked?: boolean;
}) {
    const [liked, setLiked] = useState(initialLiked);

    const [loading, setLoading] = useState(false);

    async function handleLike() {
        try {
            setLoading(true);

            const url = liked
                ? `http://localhost:5000/api/likes/${postId}`
                : `http://localhost:5000/api/likes/${postId}`;

            const res = await fetch(url, {
                method: liked ? "DELETE" : "POST",

                credentials: "include",
            });

            const data = await res.json();

            console.log(data);

            if (res.ok) {
                setLiked(!liked);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            className="
border 
px-4 
py-2 
rounded
"
        >
            {liked ? "❤️ Unlike" : "🤍 Like"}
        </button>
    );
}
