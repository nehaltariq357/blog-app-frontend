interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  console.log(content);

  return (
    <article
      className="prose max-w-none
        prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[#1A1917]
        prose-h2:text-2xl prose-h3:text-xl
        prose-p:text-[#2b2a27] prose-p:leading-[1.75]
        prose-a:text-[#B5362A] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[#1A1917]
        prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:border-l-2
        prose-blockquote:border-[#B5362A] prose-blockquote:text-[#1A1917] prose-blockquote:not-italic:font-normal
        prose-code:font-mono prose-code:text-[#B5362A] prose-code:bg-[#F6F5F1] prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-sm prose-img:border prose-img:border-[#DEDBD2]
        prose-hr:border-[#DEDBD2]"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}