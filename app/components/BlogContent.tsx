interface BlogContentProps {
  content: string;
}


export default function BlogContent({
  content,
}: BlogContentProps) {

  console.log(content)
  return (
    <article
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}