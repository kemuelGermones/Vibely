import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { likeComment, unlikeComment } from "../../apis/commentLike";
import { deleteComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import IconButton from "../ui/IconButton";

function CommentDetailsIcons({ postId, commentId, userId, isLiked }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingLikeComment, mutate: mutateLikeComment } =
    useMutation(likeComment, {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    });

  const { isLoading: isLoadingUnlikeComment, mutate: mutateUnlikeComment } =
    useMutation(unlikeComment, {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    });

  const { isLoading: isLoadingDeleteComment, mutate: mutateDeleteComment } =
    useMutation(deleteComment, {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error, variables, context) => {
        handleError(error);
      },
    });

  const handleLikeOrUnlikeComment = () => {
    if (isLiked) {
      mutateUnlikeComment({ postId, commentId });
    } else {
      mutateLikeComment({ postId, commentId });
    }
  };

  const handleDeleteComment = () => {
    mutateDeleteComment({ postId, commentId });
  };

  return (
    <div className="flex items-center gap-3">
      {user.uid === userId ? (
        <IconButton
          content="Delete"
          disabled={isLoadingDeleteComment}
          onClick={handleDeleteComment}
        >
          <BsTrash />
        </IconButton>
      ) : null}
      <IconButton
        content={isLiked ? "Unlike" : "like"}
        onClick={handleLikeOrUnlikeComment}
        disabled={isLoadingLikeComment || isLoadingUnlikeComment}
      >
        {isLiked ? <BsHeartFill className="text-yellow-400" /> : <BsHeart />}
      </IconButton>
    </div>
  );
}

export default CommentDetailsIcons;
