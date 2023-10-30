import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsChatSquare, BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { likePost, unlikePost } from "../../apis/postLike";
import useModal from "../../hooks/useModal";
import CommentModal from "../comment/CommentModal";
import IconButton from "../ui/IconButton";

function PostDetailsIcons({ data }) {
  const { showModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate: mutateLikePost, isLoading: isLoadingLikePost } = useMutation(
    likePost,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored" });
      },
    }
  );

  const { mutate: mutateUnlikePost, isLoading: isLoadingUnlikePost } =
    useMutation(unlikePost, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored" });
      },
    });

  const handleLikeOrUnlikePost = () => {
    if (data.isLiked) {
      mutateUnlikePost(data.id);
    } else {
      mutateLikePost(data.id);
    }
  };

  const handleShowCommentModal = () => {
    showModal(<CommentModal postId={data.id} />);
  };

  return (
    <div className="flex gap-3">
      <IconButton
        content={data.isLiked ? "Unlike" : "Like"}
        onClick={handleLikeOrUnlikePost}
        disabled={isLoadingLikePost || isLoadingUnlikePost}
      >
        {data.isLiked ? (
          <BsHeartFill className="text-yellow-400" size="1.5em" />
        ) : (
          <BsHeart size="1.5em" />
        )}
      </IconButton>
      <div>{data.likes}</div>
      <IconButton content="Comments" onClick={handleShowCommentModal}>
        <BsChatSquare size="1.5em" />
      </IconButton>
      <div>{data.comments}</div>
    </div>
  );
}

export default PostDetailsIcons;
