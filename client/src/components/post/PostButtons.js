import { BsHeart, BsChatSquare } from "react-icons/bs";

import useModal from "../../hooks/useModal";
import ModalComment from "../comment/ModalComment";
import IconButton from "../ui/IconButton";

function PostButtons({ postId, totalComments }) {
  const { openModal } = useModal();

  const showComments = () => {
    openModal(<ModalComment postId={postId} />);
  };

  const likeButton = (
    <IconButton content="Like">
      <BsHeart size="1.5em" />
    </IconButton>
  );

  const commentButton = (
    <IconButton content="Comments" onClick={showComments}>
      <BsChatSquare size="1.5em" />
    </IconButton>
  );

  return (
    <div className="flex gap-3">
      {likeButton}
      <div>100</div>
      {commentButton}
      <div>{totalComments}</div>
    </div>
  );
}

export default PostButtons;
