import Link from "next/link";

export default function EditButton({ id }: { id: number }) {
    return (
        <Link
            href={`/blog/edit/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Edit
        </Link>
    );
}
