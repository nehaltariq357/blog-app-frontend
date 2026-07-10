"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
    const router = useRouter();

    const handleDelete = async () => {
        const confirmDelete = confirm("Delete this post?");

        if (!confirmDelete) return;

        const res = await fetch(
            `http://localhost:5000/api/posts/${id}`,

            {
                method: "DELETE",

                credentials: "include",
            },
        );

        if (res.ok) {
            router.push("/blog");

            router.refresh();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
            Delete
        </button>
    );
}
