import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import * as yup from "yup";

import { createPost } from "../../api/post";
import validateImages from "../../utils/validateImages";
import handleError from "../../utils/handleError";
import useModal from "../../hooks/useModal";

function CreatePostForm() {
  const { closeModal } = useModal;
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createPost, {
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
          className={`resize-none rounded-lg p-3 shadow ${
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
          className={`relative flex cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            touched.images && errors.images
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="images"
        >
          <BsCloudUpload className="mx-auto text-yellow-300" size="2.5em" />
          <h1 className="text-center text-xl text-gray-700">
            {values.images.length && !errors.images
              ? `${values.images.length} images chosen`
              : "Choose images"}
          </h1>
          <p className="text-center text-gray-500">
            Upload less than or equals to 5 images
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
        <button
          className={`rounded-lg bg-yellow-300 p-2 font-semibold shadow ${
            isLoading ? "" : "hover:bg-yellow-400"
          } focus:outline-none"`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostForm;
