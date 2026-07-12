"use client";

export default function DeleteCommentButton({
    id,

    refresh,
}: {
    id: number;
    refresh: () => void;
}) {
    async function deleteComment() {
        const res = await fetch(
            `http://localhost:5000/api/comments/${id}`,

            {
                method: "DELETE",

                credentials: "include",
            },
        );

        if (res.ok) {
            refresh();
        }
    }

    return (
        <button onClick={deleteComment} className="text-red-500">
            Delete
        </button>
    );
}
