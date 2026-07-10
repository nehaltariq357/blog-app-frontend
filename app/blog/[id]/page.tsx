import BlogContent from "../../components/BlogContent";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
async function getPost(id: string) {
  const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await getPost(id);
  console.log("post", post);

  if (!post.content) {
    return <div>Post not found</div>;
  }
  return (
    <div>
      <h1>{post.title}</h1>

      <div className="flex gap-3">
        <EditButton id={post.id} />
        <DeleteButton id={post.id} />
      </div>

      <BlogContent content={post.content} />
    </div>
  );
}
