import { useContext } from "react";
import { BsTrash, BsHeart } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../store/auth-context";
import { deleteComment } from "../../api/comment";
import handleError from "../../utils/handleError";

function CommentButtonGroup({ postId, commentId, userId }) {
  const { user } = useContext(AuthContext);
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
    <button type="button" disabled={isLoading} onClick={handleDelete}>
      {isLoading ? (
        <AiOutlineLoading3Quarters
          className="animate-spin outline-none"
          data-tooltip-id="tooltip"
          data-tooltip-content="Loading"
        />
      ) : (
        <BsTrash
          className="outline-none"
          data-tooltip-id="tooltip"
          data-tooltip-content="Delete"
        />
      )}
    </button>
  );

  const likeButton = (
    <button type="button">
      <BsHeart
        className="outline-none"
        data-tooltip-id="tooltip"
        data-tooltip-content="Like"
      />
    </button>
  );

  return (
    <div className="flex items-center gap-3">
      {user.uid === userId ? deleteButton : null}
      {likeButton}
    </div>
  );
}

export default CommentButtonGroup;
