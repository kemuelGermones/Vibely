import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { signin } from "../../api/auth";
import handleError from "../../utils/handleError";
import Card from "../ui/Card";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Button from "../ui/Button";

function SigninForm() {
  const { mutate, isLoading } = useMutation(signin, {
    onError: (error, variables, context) => {
      handleError(error);
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      }),
      onSubmit: (values) => {
        mutate(values);
      },
    });

  return (
    <Card>
      <h1 className="text-center font-shrikhand text-2xl">Vibely</h1>
      <Form onSubmit={handleSubmit}>
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
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
      <p className="text-center">
        No account?{" "}
        <Link
          className="text-blue-500 underline underline-offset-4"
          to="/signup"
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}

export default SigninForm;
