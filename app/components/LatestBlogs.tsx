import BlogCard from "./../BlogCard";

async function getLatestPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/latest `, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch latest posts");
  }

  return res.json();
}

export default async function LatestBlogs() {
  const posts = await getLatestPosts();

  return (
    <section>
      <h2 className="font-mono text-[11px] uppercase tracking-wide text-[#6F6E67] mb-6">
        Latest Blogs
      </h2>

      {posts.length === 0 ? (
        <p className="text-sm text-[#6F6E67]">No blogs found.</p>
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