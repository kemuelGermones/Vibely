import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";

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
