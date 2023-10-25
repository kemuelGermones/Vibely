import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";

import { createComment } from "../../apis/comment";
import useAuth from "../../hooks/useAuth";
import validateHtml from "../../utils/validateHtml";

function CreateCommentForm({ postId }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
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
      description: yup
        .string()
        .test("description", "Description is invalid", validateHtml)
        .required(),
    }),
    onSubmit: (values) => {
      mutate({ postId, values });
    },
  });

  return (
    <form className="flex items-start gap-3" onSubmit={handleSubmit}>
      <img
        className="h-10 w-10 rounded-full"
        src={user.photoURL}
        alt={user.displayName}
      />
      <div className="flex w-full flex-col gap-3">
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
      </div>
    </form>
  );
}

export default CreateCommentForm;
