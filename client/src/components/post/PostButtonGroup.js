import { useContext } from "react";
import { BsHeart, BsChat } from "react-icons/bs";

import { ModalContext } from "../../store/modal-context";
import CommentModal from "../comment/CommentModal";

function PostButtonGroup({ id, totalComments }) {
  const { openModal } = useContext(ModalContext);

  const showComments = () => {
    openModal(<CommentModal postId={id} />);
  };

  const likeButton = (
    <button type="button">
      <div data-tooltip-id="tooltip" data-tooltip-content="Like">
        <BsHeart size="1.5em" />
      </div>
    </button>
  );

  const commentButton = (
    <button type="button" onClick={showComments}>
      <div data-tooltip-id="tooltip" data-tooltip-content="Comment">
        <BsChat size="1.5em" />
      </div>
    </button>
  );

  return (
    <div className="flex items-center gap-3">
      {likeButton}
      <div>100</div>
      {commentButton}
      <div>{totalComments}</div>
    </div>
  );
}

export default PostButtonGroup;
