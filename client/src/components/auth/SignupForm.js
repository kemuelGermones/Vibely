import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import { signup } from "../../api/auth";
import validateAvatar from "../../utils/validateAvatar";
import handleError from "../../utils/handleError";
import Card from "../ui/Card";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FileInput from "../ui/FileInput";
import Button from "../ui/Button";

function SignupForm() {
  const { mutate, isLoading } = useMutation(signup, {
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      avatar: null,
    },
    validationSchema: yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      avatar: yup.mixed().test("avatar", "avatar is invalid", validateAvatar),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleChangeAvatar = (event) => {
    setFieldValue("avatar", event.currentTarget.files[0]);
  };

  return (
    <Card>
      <h1 className="text-center font-shrikhand text-2xl">Vibely</h1>
      <Form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            error={touched.firstname && errors.firstname}
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Enter first name"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            error={touched.lastname && errors.lastname}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter last name"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <Input
          error={touched.username && errors.username}
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          error={touched.email && errors.email}
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          error={touched.password && errors.password}
          id="password"
          name="password"
          type="password"
          placeholder="Enter password (at least 6 characters)"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FileInput
          error={touched.avatar && errors.avatar}
          title="Choose profile picture"
          description="Upload your avatar PNG, JPG or JPEG."
          id="avatar"
          name="avatar"
          onChange={handleChangeAvatar}
          onBlur={handleBlur}
        >
          <div className="h-24 w-24 shrink-0">
            <img
              className="h-full w-full rounded-full bg-yellow-400 object-cover"
              src={
                values.avatar && !errors.avatar
                  ? URL.createObjectURL(values.avatar)
                  : "./person.svg"
              }
            />
          </div>
        </FileInput>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
      <p className="text-center">
        Have an account?{" "}
        <Link
          className="text-blue-600 underline underline-offset-4"
          to="/signin"
        >
          Sign in
        </Link>
      </p>
    </Card>
  );
}

export default SignupForm;
