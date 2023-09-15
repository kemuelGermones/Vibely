import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { createMessage } from "../../apis/message";
import handleError from "../../utils/handleError";

function CreateMessageForm({ userId }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createMessage, {
    onSuccess: () => {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["users", userId, "messages"]
      })
    },
    onError: (error) => {
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
      content: "",
    },
    validationSchema: yup.object({
      content: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutate({ userId, values });
    },
  });

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <textarea
        className={
          touched.content && errors.content
            ? "textarea-warning"
            : "textarea-primary"
        }
        id="content"
        name="content"
        type="text"
        placeholder="Enter message"
        value={values.content}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button className="btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Send"}
      </button>
    </form>
  );
}

export default CreateMessageForm;
