import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";

function CommentModal({ postId }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <CreateCommentForm postId={postId} />
      <div id="comments" className="h-80 overflow-y-auto">
        <CommentList postId={postId} />
      </div>
    </div>
  );
}

export default CommentModal;
