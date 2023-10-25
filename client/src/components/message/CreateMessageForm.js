import { useFormik } from "formik";
import * as yup from "yup";

import useSocket from "../../hooks/useSocket";
import validateHtml from "../../utils/validateHtml";

function CreateMessageForm({ userId }) {
  const socket = useSocket();

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
      content: yup
        .string()
        .test("content", "Content is invalid", validateHtml)
        .required(),
    }),
    onSubmit: (values) => {
      socket.current.emit("send_message", userId, values);
      resetForm();
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
      <button className="btn-primary" type="submit">
        Send
      </button>
    </form>
  );
}

export default CreateMessageForm;
