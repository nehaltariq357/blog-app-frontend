import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentItem({
  comment,
  refresh,
}: {
  comment: any;
  refresh: () => void;
}) {
  return (
    <div className="py-4 border-t border-[#DEDBD2] first:border-t-0 first:pt-0">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 shrink-0 rounded-full bg-[#1A1917] text-[#F6F5F1] flex items-center justify-center font-serif text-xs mt-0.5">
            {comment.user.name?.[0]?.toUpperCase()}
          </div>

          <div>
            <h3 className="text-[12.5px] font-semibold text-[#1A1917] mb-0.5">
              {comment.user.name}
            </h3>

            <p className="text-[12.5px] text-[#6F6E67] leading-relaxed">
              {comment.text}
            </p>
          </div>
        </div>

        <DeleteCommentButton id={comment.id} refresh={refresh} />
      </div>
    </div>
  );
}