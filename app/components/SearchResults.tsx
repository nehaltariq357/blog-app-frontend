import BlogCard from "../BlogCard";

export default function SearchResults({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return (
      <div className="mt-6 text-center font-mono text-[11px] uppercase tracking-wide text-[#6F6E67]">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}