import BlogCard from "../BlogCard";

async function getTrendingPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/trending", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch {
    return [];
  }
}

export default async function TrendingBlogs() {
  const posts = await getTrendingPosts();

  return (
    <section>
      <h2 className="font-mono text-[11px] uppercase tracking-wide text-[#B5362A] mb-6">
        Trending Blogs
      </h2>

      {posts.length === 0 ? (
        <p className="text-sm text-[#6F6E67]">No trending blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
          {posts.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}