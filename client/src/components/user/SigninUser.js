import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

import { signin } from "../../api/user";
import handleError from "../../utils/handleError";

function SigninUser() {
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
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1 className="text-center text-lg font-semibold">
        Sign in to your account
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className={`w-full rounded-lg p-3 shadow ${
            touched.email && errors.email
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          className={`w-full rounded-lg p-3 shadow ${
            touched.password && errors.password
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className={`w-full rounded-lg bg-yellow-300 p-2 font-semibold shadow ${
            isLoading ? "" : "hover:bg-yellow-400"
          } focus:outline-none"`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <p className="text-center">
        No account?{" "}
        <Link
          className="text-blue-600 underline underline-offset-4"
          to="/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default SigninUser;
