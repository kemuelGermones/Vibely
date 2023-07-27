import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { ModalContext } from "../../store/modal-context";
import { addPost } from "../../api/post";
import validateImages from "../../utils/validateImages";
import handleError from "../../utils/handleError";

function CreatePostForm() {
  const { closeModal } = useContext(ModalContext);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(addPost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      caption: "",
      images: [],
    },
    validationSchema: yup.object({
      caption: yup.string().required(),
      images: yup.mixed().test("images", "images is invalid", validateImages),
    }),
    onSubmit: (data) => {
      mutate(data);
    },
  });

  const handleChangeImages = (event) => {
    setFieldValue("images", [...event.currentTarget.files]);
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className={`w-full resize-none rounded-lg p-3 shadow ${
            touched.caption && errors.caption
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="caption"
          name="caption"
          type="text"
          placeholder="Enter caption"
          value={values.caption}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            touched.images && errors.images
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="images"
        >
          <img className="mx-auto h-14 w-14" src="./upload.svg" />
          <h1 className="text-center text-xl text-gray-700">
            {values.images.length && !errors.images
              ? `${values.images.length} images chosen`
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
            onChange={handleChangeImages}
            onBlur={handleBlur}
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`w-full rounded-lg bg-gray-500 p-2 font-semibold text-white shadow ${
              isLoading ? "" : "hover:bg-gray-600"
            } focus:outline-none"`}
            type="button"
            disabled={isLoading}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className={`w-full rounded-lg bg-blue-500 p-2 font-semibold text-white shadow ${
              isLoading ? "" : "hover:bg-blue-600"
            } focus:outline-none"`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
