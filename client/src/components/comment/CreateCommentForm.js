import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { createComment } from "../../api/comment";
import handleError from "../../utils/handleError";
import Avatar from "../ui/Avatar";
import Form from "../ui/Form";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

function CreateCommentForm({ postId }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data, varaibles, context) => {
      resetForm();
      queryClient.invalidateQueries({
        queryKey: ["posts", postId, "comments"],
      });
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
    resetForm,
  } = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: yup.object({
      description: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutate({ postId, values });
    },
  });

  return (
    <div className="flex gap-3 [&>*:nth-child(2)]:grow">
      <Avatar src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <Form onSubmit={handleSubmit}>
        <Textarea
          error={touched.description && errors.description}
          id="description"
          name="description"
          type="text"
          placeholder="Add comment"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateCommentForm;
