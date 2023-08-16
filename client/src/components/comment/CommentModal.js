import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";
import Card from "../ui/Card";

function CommentModal({ postId }) {
  return (
    <Card>
      <CreateCommentForm postId={postId} />
      <CommentList postId={postId} />
    </Card>
  );
}

export default CommentModal;
