import BlogCard from "./BlogCard";

export default function BlogList({ posts }: { posts: any[] }) {
  return (
    <div>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}