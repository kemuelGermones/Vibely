import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";
import Card from "../ui/Card";

function CommentModal({ postId }) {
  return (
    <Card>
      <CreateCommentForm postId={postId} />
      <div id="commentList" className="h-80 overflow-y-auto">
        <CommentList postId={postId} />
      </div>
    </Card>
  );
}

export default CommentModal;
