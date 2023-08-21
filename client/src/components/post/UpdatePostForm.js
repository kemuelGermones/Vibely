import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { updatePost } from "../../apis/post";
import useModal from "../../hooks/useModal";
import handleError from "../../utils/handleError";

function UpdatePostForm({ postId, caption }) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updatePost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const { touched, values, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        caption,
      },
      validationSchema: yup.object({
        caption: yup.string().required(),
      }),
      onSubmit: (values) => {
        mutate({ postId, values });
      },
    });

  return (
    <div className="card">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className={
            touched.caption && errors.caption
              ? "textarea-warning h-44"
              : "textarea-primary h-44"
          }
          id="caption"
          name="caption"
          placeholder="Enter caption"
          value={values.caption}
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

export default UpdatePostForm;
