import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { signin } from "../../apis/auth";
import handleError from "../../utils/handleError";

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
    <div className="card flex flex-col gap-3">
      <div className="text-center font-shrikhand text-2xl">Vibely</div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className={
            touched.email && errors.email ? "input-warning" : "input-primary"
          }
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          className={
            touched.password && errors.password
              ? "input-warning"
              : "input-primary"
          }
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button className="btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="text-center">
        No account?{" "}
        <Link
          className="text-blue-500 underline underline-offset-4"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SigninForm;
