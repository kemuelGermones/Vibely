import { BsHeart, BsChatSquare } from "react-icons/bs";

import useModal from "../../hooks/useModal";
import ModalComment from "../comment/ModalComment";
import IconButton from "../ui/IconButton";

function PostIcons({ postId, totalComments }) {
  const { openModal } = useModal();

  const showComments = () => {
    openModal(<ModalComment postId={postId} />);
  };

  return (
    <div className="flex gap-3">
      <IconButton content="Like">
        <BsHeart size="1.5em" />
      </IconButton>
      <div>100</div>
      <IconButton content="Comments" onClick={showComments}>
        <BsChatSquare size="1.5em" />
      </IconButton>
      <div>{totalComments}</div>
    </div>
  );
}

export default PostIcons;
