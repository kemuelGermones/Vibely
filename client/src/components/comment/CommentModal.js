import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";

function CommentModal({ id }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <CreateCommentForm id={id} />
      <div id="comments" className="h-80 overflow-y-auto">
        <CommentList id={id} />
      </div>
    </div>
  );
}

export default CommentModal;
