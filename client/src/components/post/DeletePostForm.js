import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "../../api/post";
import { ModalContext } from "../../store/modal-context";
import handleError from "../../utils/handleError";

function DeletePostForm({ id }) {
  const { closeModal } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(deletePost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <div className="flex flex-col gap-3 rounded-lg p-6">
        <img className="mx-auto h-14 w-14" src="./cross-circle.svg" />
        <h1 className="text-center text-xl text-gray-700">Are you sure?</h1>
        <p className="text-center text-gray-500">
          You won't be able to revert this
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          className={`w-full rounded-lg bg-gray-500 p-2 font-semibold text-white shadow ${
            mutation.isLoading ? "" : "hover:bg-gray-600"
          } focus:outline-none"`}
          disabled={mutation.isLoading}
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </button>
        <button
          className={`w-full rounded-lg bg-red-500 p-2 font-semibold text-white shadow ${
            mutation.isLoading ? "" : "hover:bg-red-600"
          } focus:outline-none`}
          disabled={mutation.isLoading}
          onClick={() => {
            mutation.mutate(id);
          }}
        >
          {mutation.isLoading ? "Loading..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default DeletePostForm;
