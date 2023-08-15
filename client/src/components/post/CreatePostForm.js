import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { BsCloudUpload } from "react-icons/bs";
import * as yup from "yup";

import { createPost } from "../../api/post";
import validateImages from "../../utils/validateImages";
import handleError from "../../utils/handleError";
import useModal from "../../hooks/useModal";
import Card from "../ui/Card";
import Form from "../ui/Form";
import Textarea from "../ui/Textarea";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";

function CreatePostForm() {
  const { closeModal } = useModal();
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
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleChangeImages = (event) => {
    setFieldValue("images", [...event.currentTarget.files]);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Textarea
          id="caption"
          name="caption"
          type="text"
          placeholder="Enter caption"
          value={values.caption}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FileInput
          error={touched.images && errors.images}
          title={
            values.images.length && !errors.images
              ? `${values.images.length} images chosen`
              : "Choose images"
          }
          description="Upload less than or equals to 5 images PNG, JPG or JPEG."
          id="images"
          name="images"
          onChange={handleChangeImages}
          onBlur={handleBlur}
        >
          <BsCloudUpload className="text-yellow-300" size="2.5em" />
        </FileInput>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </Card>
  );
}

export default CreatePostForm;
