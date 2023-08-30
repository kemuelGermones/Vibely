import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment, likeComment, unlikeComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import IconButton from "../ui/IconButton";

function CommentDetailsIcons({ postId, commentId, userId, isLiked }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    isLoading: isLoadingLikeOrUnlikeComment,
    mutate: mutateLikeOrUnlikeComment,
  } = useMutation(isLiked ? unlikeComment : likeComment, {
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
    mutateLikeOrUnlikeComment({ postId, commentId });
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
        disabled={isLoadingLikeOrUnlikeComment}
      >
        {isLiked ? <BsHeartFill className="text-yellow-400" /> : <BsHeart />}
      </IconButton>
    </div>
  );
}

export default CommentDetailsIcons;
