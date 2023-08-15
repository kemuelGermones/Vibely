import CreateCommentForm from "./CreateCommentForm";
import ListComment from "./ListComment";
import Card from "../ui/Card";

function ModalComment({ postId }) {
  return (
    <Card>
      <CreateCommentForm postId={postId} />
      <ListComment postId={postId} />
    </Card>
  );
}

export default ModalComment;
