import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import * as yup from "yup";

import { createPost } from "../../apis/post";
import validateImages from "../../utils/validateImages";
import handleError from "../../utils/handleError";
import useModal from "../../hooks/useModal";
import FileInput from "../ui/FileInput";

function CreatePostForm() {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
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
      <button className="btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default CreatePostForm;
