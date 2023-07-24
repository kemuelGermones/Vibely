import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";

import { AuthContext } from "../../store/auth-context";
import { ModalContext } from "../../store/modal-context";

function UpdatePost({ id, caption }) {
  const { user } = useContext(AuthContext);
  const { closeModal } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data) =>
      axios.patch(`http://localhost:5000/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      }),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        closeModal();
      },
      onError: (error, variables, context) => {
        const message = error.response.data.message;
        toast.error(message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      caption,
    },
    validationSchema: yup.object({
      caption: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <textarea
          className={`w-full resize-none rounded-lg p-3 shadow ${
            formik.touched.caption && formik.errors.caption
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="caption"
          name="caption"
          type="text"
          placeholder="Enter caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          className={`w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow ${
            mutation.isLoading ? "" : "hover:bg-yellow-400"
          } focus:outline-none"`}
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
