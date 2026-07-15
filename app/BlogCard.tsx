import Link from "next/link";

export default function BlogCard({ post }: { post: any }) {
  return (
    <div className="py-8 border-b border-[#DEDBD2] group">
      <h2 className="font-serif font-semibold text-[27px] leading-tight text-[#1A1917] mb-2 group-hover:underline decoration-[#B5362A] decoration-[1.5px] underline-offset-4">
        {post.title}
      </h2>

      <p className="text-[14.5px] text-[#6F6E67] leading-relaxed max-w-[56ch] mb-4">
        {post.content.replace(/<[^>]+>/g, "").slice(0, 120)}
        ...
      </p>

      <Link
        href={`/blog/${post.slug}`}
        className="font-mono text-[11px] uppercase tracking-wide text-[#B5362A] hover:text-[#93281e]"
      >
        Read More →
      </Link>
    </div>
  );
}