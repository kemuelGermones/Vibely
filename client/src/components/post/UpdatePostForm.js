import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";

import { updatePost } from "../../apis/post";
import useModal from "../../hooks/useModal";
import validateHtml from "../../utils/validateHtml";

function UpdatePostForm({ postId, caption }) {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      hideModal();
    },
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  const { touched, values, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        caption,
      },
      validationSchema: yup.object({
        caption: yup
          .string()
          .test("caption", "Caption is invalid", validateHtml)
          .required(),
      }),
      onSubmit: (values) => {
        mutate({ postId, values });
      },
    });

  return (
    <form className="card flex flex-col gap-3" onSubmit={handleSubmit}>
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
      <div className="grid grid-cols-2 gap-3">
        <button
          className="btn-secondary"
          type="button"
          disabled={isLoading}
          onClick={hideModal}
        >
          Cancel
        </button>
        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default UpdatePostForm;
