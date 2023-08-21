import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { createComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import handleError from "../../utils/handleError";
import Avatar from "../ui/Avatar";

function CreateCommentForm({ postId }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
    onSubmit: (values) => {
      mutate({ postId, values });
    },
  });

  return (
    <div className="flex gap-3">
      <Avatar src={user.photoURL} />
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className={
            touched.description && errors.description
              ? "textarea-warning w-full"
              : "textarea-primary w-full"
          }
          id="description"
          name="description"
          type="text"
          placeholder="Add comment"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreateCommentForm;
