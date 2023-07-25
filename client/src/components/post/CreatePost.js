import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { ModalContext } from "../../store/modal-context";
import { addPost } from "../../api/post";
import validateImages from "../../utils/validateImages";
import handleError from "../../utils/handleError";

function CreatePost() {
  const { closeModal } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(addPost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      caption: "",
      images: [],
    },
    validationSchema: yup.object({
      caption: yup.string().required(),
      images: yup.mixed().test("images", "images is invalid", validateImages),
    }),
    onSubmit: (data) => {
      mutation.mutate(data);
    },
  });

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <textarea
          className={`h-24 w-full resize-none rounded-lg p-3 shadow ${
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
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            formik.touched.images && formik.errors.images
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="images"
        >
          <svg
            className="mx-auto h-20 w-20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="#fde047"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <h1 className="text-center text-xl text-gray-700">
            {formik.values.images.length && !formik.errors.images
              ? `${formik.values.images.length} images chosen`
              : "Choose images"}
          </h1>
          <p className="text-center text-gray-500">
            Upload less than or equals to 5 images
            <br />
            (PNG, JPG or JPEG).
          </p>
          <input
            className="absolute -z-10 opacity-0"
            id="images"
            name="images"
            type="file"
            multiple={true}
            onChange={(event) => {
              formik.setFieldValue("images", [...event.currentTarget.files]);
            }}
            onBlur={formik.handleBlur}
          />
        </label>
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

export default CreatePost;
