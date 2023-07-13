import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import { auth } from "../../config/firebase";
import extractErrorMsg from "../../utils/extractErrorMsg";

function SigninUser() {
  const mutation = useMutation(
    (data) => signInWithEmailAndPassword(auth, data.email, data.password),
    {
      onError: (error, variables, context) => {
        const message = extractErrorMsg(error);
        toast.error(message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1 className="text-center text-lg font-semibold">
        Sign in to your account
      </h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <input
          className={`w-full rounded-lg p-3 shadow ${
            formik.touched.email && formik.errors.email
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input
          className={`w-full rounded-lg p-3 shadow ${
            formik.touched.password && formik.errors.password
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          className="w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow hover:bg-yellow-400 focus:outline-none"
          type="submit"
          disabled={mutation.isLoading}
        >
          Sign in
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
