import { BsHeart, BsChatSquare } from "react-icons/bs";

import useModal from "../../hooks/useModal";
import CommentModal from "../comment/CommentModal";
import IconButton from "../ui/IconButton";

function PostDetailsIcons({ postId, totalComments }) {
  const { openModal } = useModal();

  const handleShowCommentModal = () => {
    openModal(<CommentModal postId={postId} />);
  };

  return (
    <div className="flex gap-3">
      <IconButton content="Like">
        <BsHeart size="1.5em" />
      </IconButton>
      <div>100</div>
      <IconButton content="Comments" onClick={handleShowCommentModal}>
        <BsChatSquare size="1.5em" />
      </IconButton>
      <div>{totalComments}</div>
    </div>
  );
}

export default PostDetailsIcons;
