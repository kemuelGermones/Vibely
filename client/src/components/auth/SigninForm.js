import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { signin } from "../../apis/client";
import validateHtml from "../../utils/validateHtml";

function SigninForm() {
  const { mutate, isLoading } = useMutation(signin, {
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
    },
  });

  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .email()
          .test("email", "Email is invalid", validateHtml)
          .required(),
        password: yup.string().required(),
      }),
      onSubmit: (values) => {
        mutate(values);
      },
    });

  return (
    <form className="card flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="text-center font-shrikhand text-2xl">Vibely</div>
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
      <div className="text-center">
        No account?{" "}
        <Link
          className="text-blue-500 underline underline-offset-4"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default SigninForm;
