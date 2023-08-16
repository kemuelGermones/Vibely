import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsXCircle } from "react-icons/bs";

import { deletePost } from "../../api/post";
import useModal from "../../hooks/useModal";
import handleError from "../../utils/handleError";
import Card from "../ui/Card";
import Button from "../ui/Button";

function DeletePostModal({ postId }) {
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
    <Card>
      <div className="flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-red-500 p-6 shadow">
        <BsXCircle className="text-red-500" size="2.5em" />
        <h1 className="text-center text-xl text-gray-700">Are you sure?</h1>
        <p className="text-center text-gray-500">
          You won't be able to revert this.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          theme="secondary"
          type="button"
          disabled={isLoading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          theme="danger"
          type="button"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? "Loading..." : "Delete"}
        </Button>
      </div>
    </Card>
  );
}

export default DeletePostModal;
