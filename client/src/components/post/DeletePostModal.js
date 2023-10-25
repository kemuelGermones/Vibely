import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

import { deletePost } from "../../apis/post";
import useModal from "../../hooks/useModal";

function DeletePostModal({ postId }) {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      hideModal();
    },
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  const handleDeletePost = () => {
    mutate(postId);
  };

  return (
    <div className="card flex flex-col gap-3">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-red-500 p-6 shadow">
        <BsTrash className="text-red-500" size="2.5em" />
        <div className="text-center text-xl text-gray-700">Are you sure?</div>
        <div className="text-center text-gray-500">
          You won't be able to revert this.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          className="btn-secondary"
          type="button"
          disabled={isLoading}
          onClick={hideModal}
        >
          Cancel
        </button>
        <button
          className="btn-warning"
          type="button"
          disabled={isLoading}
          onClick={handleDeletePost}
        >
          {isLoading ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default DeletePostModal;
