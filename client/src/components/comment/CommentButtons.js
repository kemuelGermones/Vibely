import { BsTrash, BsHeart } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "../../api/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import IconButton from "../ui/IconButton";

function CommentButtons({ postId, commentId, userId }) {
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

  const handleDelete = () => {
    mutate({ postId, commentId });
  };

  const deleteButton = (
    <IconButton content="Delete" disabled={isLoading} onClick={handleDelete}>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin outline-none" />
      ) : (
        <BsTrash className="outline-none" />
      )}
    </IconButton>
  );

  const likeButton = (
    <IconButton content="Like">
      <BsHeart />
    </IconButton>
  );

  return (
    <div className="flex items-center gap-3">
      {user.uid === userId ? deleteButton : null}
      {likeButton}
    </div>
  );
}

export default CommentButtons;
