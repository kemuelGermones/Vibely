import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import { signup } from "../../api/user";
import validateAvatar from "../../utils/validateAvatar";
import handleError from "../../utils/handleError";

function SignupUser() {
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
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1 className="text-center text-lg font-semibold">Create your account</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={`w-full rounded-lg p-3 shadow ${
              touched.firstname && errors.firstname
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Enter first name"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className={`w-full rounded-lg p-3 shadow ${
              touched.lastname && errors.lastname
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter last name"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <input
          className={`w-full rounded-lg p-3 shadow ${
            touched.username && errors.username
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
          placeholder="Enter password (at least 6 characters)"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            touched.avatar && errors.avatar
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="avatar"
        >
          <div className="mx-auto h-36 w-36 shrink-0">
            <img
              className="h-full w-full rounded-full bg-yellow-100 object-cover"
              src={
                values.avatar && !errors.avatar
                  ? URL.createObjectURL(values.avatar)
                  : "./person.svg"
              }
            />
          </div>
          <h2 className="text-center text-xl text-gray-700">
            Choose profile picture
          </h2>
          <p className="text-center text-gray-500">
            Upload your avatar PNG, JPG or JPEG.
          </p>
          <input
            className="absolute -z-10 opacity-0"
            id="avatar"
            name="avatar"
            type="file"
            onChange={handleChangeAvatar}
            onBlur={handleBlur}
          />
        </label>
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
        Have an account?{" "}
        <Link
          className="text-blue-600 underline underline-offset-4"
          to="/signin"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default SignupUser;
