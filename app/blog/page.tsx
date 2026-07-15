import BlogList from "../BlogList";

async function getPosts() {
  const res = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store",
  });

  return res.json();
}

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="mb-10 pb-8 border-b border-[#DEDBD2]">
          <span className="inline-block font-mono text-[10.5px] uppercase tracking-wider text-[#B5362A] border border-[#B5362A] rounded-sm px-2 py-1 -rotate-2 mb-4">
            All Posts
          </span>
          <h1 className="font-serif font-bold text-4xl text-[#1A1917] mb-2">
            All Blogs
          </h1>
          <p className="font-mono text-xs text-[#6F6E67] uppercase tracking-wide">
            {posts?.length ?? 0} posts published
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </div>
  );
}