import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { createComment } from "../../api/comment";
import handleError from "../../utils/handleError";

function CreateCommentForm({ postId }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data, varaibles, context) => {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: yup.object({
      description: yup.string().required(),
    }),
    onSubmit: (data) => {
      mutate({ postId, data });
    },
  });

  return (
    <div className="flex gap-3">
      <div className="h-10 w-10 shrink-0">
        <img
          className="h-full w-full rounded-full object-cover"
          src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className={`w-full resize-none rounded-lg p-3 shadow ${
            touched.description && errors.description
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="description"
          name="description"
          type="text"
          placeholder="Add comment"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className={`w-full rounded-lg bg-yellow-300 p-2 font-semibold shadow ${
            isLoading ? "" : "hover:bg-yellow-400"
          } focus:outline-none"`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Comment"}
        </button>
      </form>
    </div>
  );
}

export default CreateCommentForm;
