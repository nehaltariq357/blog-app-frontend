import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogContent from "../../components/BlogContent";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";
import BlogComments from "../../components/BlogComments";
import LikeButton from "../../components/LikeButton";
import LikeCount from "../../components/LikeCount";

async function getPost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
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
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="font-serif font-bold text-4xl md:text-[44px] leading-tight tracking-tight text-[#1A1917] mb-6">
          {post.title}
        </h1>

        <div className="flex gap-3 mb-8">
          <EditButton slug={post.slug} />
          <DeleteButton id={post.id} />
        </div>

        {post.thumbnail && (
          <div className="mb-8">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto rounded-sm border border-[#DEDBD2]"
            />
          </div>
        )}

        <div className="text-[18px] leading-[1.75] text-[#2b2a27] [&_p]:mb-5">
          <BlogContent content={post.content} />
        </div>

        {/* author name */}
        <div className="flex items-center gap-3 mt-10 pt-6 border-t border-[#DEDBD2]">
          <div className="w-9 h-9 rounded-full bg-[#1A1917] text-[#F6F5F1] flex items-center justify-center font-serif text-sm">
            {post.author.name?.[0]?.toUpperCase()}
          </div>
          <p className="text-sm text-[#6F6E67]">
            By <span className="font-semibold text-[#1A1917]">{post.author.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#DEDBD2] font-mono text-sm text-[#6F6E67]">
          <LikeButton postId={post.id} />
          <LikeCount postId={post.id} />
        </div>

        <div className="mt-10 pt-8 border-t border-[#DEDBD2]">
          <BlogComments postId={post.id} />
        </div>
      </div>
    </div>
  );
}