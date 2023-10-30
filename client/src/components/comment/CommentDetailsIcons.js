import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsHeart, BsHeartFill, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

import { deleteComment } from "../../apis/comment";
import { likeComment, unlikeComment } from "../../apis/commentLike";
import useAuth from "../../hooks/useAuth";
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
        toast.error(error.message, { theme: "colored" });
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
        toast.error(error.message, { theme: "colored" });
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
        toast.error(error.message, { theme: "colored" });
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
    <div className="flex gap-3">
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
        content={data.isLiked ? "Unlike" : "Like"}
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
