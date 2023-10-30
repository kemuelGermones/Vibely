import CommentList from "./CommentList";
import CreateCommentForm from "./CreateCommentForm";

function CommentModal({ postId }) {
  return (
    <div className="card flex flex-col gap-3">
      <CreateCommentForm postId={postId} />
      <div id="commentList" className="h-80 overflow-y-auto">
        <CommentList postId={postId} />
      </div>
    </div>
  );
}

export default CommentModal;
