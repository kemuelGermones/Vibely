import { BsTrash, BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { likeComment, unlikeComment } from "../../apis/commentLike";
import { deleteComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import IconButton from "../ui/IconButton";

function CommentDetailsIcons({ postId, data }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading: isLoadingLikeComment, mutate: mutateLikeComment } =
    useMutation(likeComment, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error) => {
        handleError(error);
      },
    });

  const { isLoading: isLoadingUnlikeComment, mutate: mutateUnlikeComment } =
    useMutation(unlikeComment, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error) => {
        handleError(error);
      },
    });

  const { isLoading: isLoadingDeleteComment, mutate: mutateDeleteComment } =
    useMutation(deleteComment, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      },
      onError: (error) => {
        handleError(error);
      },
    });

  const handleLikeOrUnlikeComment = () => {
    if (data.isLiked) {
      mutateUnlikeComment({ postId, commentId: data.id });
    } else {
      mutateLikeComment({ postId, commentId: data.id });
    }
  };

  const handleDeleteComment = () => {
    mutateDeleteComment({ postId, commentId: data.id });
  };

  return (
    <div className="flex items-center gap-3">
      {user.uid === data.user.id ? (
        <IconButton
          content="Delete"
          disabled={isLoadingDeleteComment}
          onClick={handleDeleteComment}
        >
          <BsTrash />
        </IconButton>
      ) : null}
      <IconButton
        content={data.isLiked ? "Unlike" : "like"}
        onClick={handleLikeOrUnlikeComment}
        disabled={isLoadingLikeComment || isLoadingUnlikeComment}
      >
        {data.isLiked ? (
          <BsHeartFill className="text-yellow-400" />
        ) : (
          <BsHeart />
        )}
      </IconButton>
    </div>
  );
}

export default CommentDetailsIcons;
