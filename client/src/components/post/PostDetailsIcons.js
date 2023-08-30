import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsHeart, BsHeartFill, BsChatSquare } from "react-icons/bs";

import { likePost, unlikePost } from "../../apis/post";
import handleError from "../../utils/handleError";
import useModal from "../../hooks/useModal";
import CommentModal from "../comment/CommentModal";
import IconButton from "../ui/IconButton";

function PostDetailsIcons({ postId, isLiked, likes, comments }) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: mutateLikePost, isLoading: isLoadingLikePost } = useMutation(
    likePost,
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    }
  );

  const { mutate: mutateUnlikePost, isLoading: isLoadingUnlikePost } =
    useMutation(unlikePost, {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    });

  const handleLikeOrUnlikePost = () => {
    if (isLiked) {
      mutateUnlikePost(postId);
    } else {
      mutateLikePost(postId);
    }
  };

  const handleShowCommentModal = () => {
    openModal(<CommentModal postId={postId} />);
  };

  return (
    <div className="flex gap-3">
      <IconButton
        content={isLiked ? "Unlike" : "like"}
        onClick={handleLikeOrUnlikePost}
        disabled={isLoadingLikePost || isLoadingUnlikePost}
      >
        {isLiked ? (
          <BsHeartFill className="text-yellow-400" size="1.5em" />
        ) : (
          <BsHeart size="1.5em" />
        )}
      </IconButton>
      <div>{likes}</div>
      <IconButton content="Comments" onClick={handleShowCommentModal}>
        <BsChatSquare size="1.5em" />
      </IconButton>
      <div>{comments}</div>
    </div>
  );
}

export default PostDetailsIcons;
