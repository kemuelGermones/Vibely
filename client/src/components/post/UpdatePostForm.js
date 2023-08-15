import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { updatePost } from "../../api/post";
import useModal from "../../hooks/useModal";
import handleError from "../../utils/handleError";
import Card from "../ui/Card";
import Form from "../ui/Form";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

function UpdatePostForm({ postId, caption }) {
  const { closeModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updatePost, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
    },
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const { touched, values, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        caption,
      },
      validationSchema: yup.object({
        caption: yup.string().required(),
      }),
      onSubmit: (values) => {
        mutate({ postId, values });
      },
    });

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Textarea
          height="h-44"
          id="caption"
          name="caption"
          placeholder="Enter caption"
          error={touched.caption && errors.caption}
          value={values.caption}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </Card>
  );
}

export default UpdatePostForm;
