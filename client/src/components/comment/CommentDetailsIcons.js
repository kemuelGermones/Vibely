import { BsTrash, BsHeart } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import IconButton from "../ui/IconButton";

function CommentDetailsIcons({ postId, commentId, userId }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(deleteComment, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const handleDeleteComment = () => {
    mutate({ postId, commentId });
  };

  return (
    <div className="flex items-center gap-3">
      {user.uid === userId ? (
        <IconButton
          content="Delete"
          disabled={isLoading}
          onClick={handleDeleteComment}
        >
          <BsTrash />
        </IconButton>
      ) : null}
      <IconButton content="Like">
        <BsHeart />
      </IconButton>
    </div>
  );
}

export default CommentDetailsIcons;
