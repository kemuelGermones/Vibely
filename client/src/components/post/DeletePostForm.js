import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsXCircle } from "react-icons/bs";

import { deletePost } from "../../api/post";
import useModal from "../../hooks/useModal";
import handleError from "../../utils/handleError";

function DeletePostForm({ postId }) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(deletePost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const handleDelete = () => {
    mutate(postId);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3">
        <div className="flex cursor-pointer flex-col gap-3 rounded-lg border border-red-500 p-6 shadow">
          <BsXCircle className="mx-auto text-red-500" size="2.5em" />
          <h1 className="text-center text-xl text-gray-700">Are you sure?</h1>
          <p className="text-center text-gray-500">
            You won't be able to revert this.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`rounded-lg bg-gray-500 p-2 font-semibold text-white shadow ${
              isLoading ? "" : "hover:bg-gray-600"
            } focus:outline-none"`}
            disabled={isLoading}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`rounded-lg bg-red-500 p-2 font-semibold text-white shadow ${
              isLoading ? "" : "hover:bg-red-600"
            } focus:outline-none`}
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostForm;
