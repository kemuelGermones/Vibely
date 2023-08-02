import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";

function CommentModal({ postId }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <CreateCommentForm postId={postId} />
        <div id="comments" className="h-80 overflow-y-auto">
          <CommentList postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
