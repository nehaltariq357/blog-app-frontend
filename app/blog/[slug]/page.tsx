import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogContent from "../../components/BlogContent";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
import BlogComments from "../../components/BlogComments";
import LikeButton from "../../components/LikeButton";
import LikeCount from "../../components/LikeCount";
async function getPost(slug: string) {
  const res = await fetch(`http://localhost:5000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",

      images: post.thumbnail
        ? [
            {
              url: post.thumbnail,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },

    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      <div className="flex gap-3 mb-8">
        <EditButton slug={post.slug} />
        <DeleteButton id={post.id} />
      </div>

      <BlogContent content={post.content} />
      {post.thumbnail && (
        <div className="my-4">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
      <LikeButton postId={post.id} />

      {/* <LikeCount postId={post.id} /> */}
      <BlogComments postId={post.id} />
    </div>
  );
}
