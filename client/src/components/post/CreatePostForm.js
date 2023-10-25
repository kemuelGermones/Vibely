import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import { toast } from "react-toastify";
import * as yup from "yup";

import { createPost } from "../../apis/post";
import useModal from "../../hooks/useModal";
import validateHtml from "../../utils/validateHtml";
import validateImages from "../../utils/validateImages";
import FileInput from "../ui/FileInput";

function CreatePostForm() {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      hideModal();
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      caption: "",
      images: [],
    },
    validationSchema: yup.object({
      caption: yup
        .string()
        .test("caption", "Caption is invalid", validateHtml)
        .required(),
      images: yup
        .array()
        .min(1)
        .max(5)
        .test("images", "Images is invalid", validateImages)
        .required(),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleOnChangeImages = (event) => {
    setFieldValue("images", [...event.currentTarget.files]);
  };

  return (
    <form className="card flex flex-col gap-3" onSubmit={handleSubmit}>
      <textarea
        className={
          touched.caption && errors.caption
            ? "textarea-warning"
            : "textarea-primary"
        }
        id="caption"
        name="caption"
        type="text"
        placeholder="Enter caption"
        value={values.caption}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FileInput
        hasError={touched.images && errors.images}
        title={
          values.images.length && !errors.images
            ? `${values.images.length} images chosen`
            : "Choose images"
        }
        description="Upload less than or equals to 5 images PNG, JPG or JPEG."
        id="images"
        name="images"
        multiple={true}
        onChange={handleOnChangeImages}
        onBlur={handleBlur}
      >
        <BsCloudUpload className="text-yellow-400" size="2.5em" />
      </FileInput>
      <div className="grid grid-cols-2 gap-3">
        <button
          className="btn-secondary"
          type="button"
          disabled={isLoading}
          onClick={hideModal}
        >
          Cancel
        </button>
        <button
          className="btn-primary bg-green-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default CreatePostForm;
