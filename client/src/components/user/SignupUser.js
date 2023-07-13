import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";

function SignupUser() {
  const mutation = useMutation({
    mutationFn: (data) => axios.post("http://localhost:5000/signup", data),
    onSuccess: (data, variables, context) => {
      console.log(data.data);
    },
    onError: (error, variables, context) => {
      console.log(error.response.data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      avatar: yup.mixed().test("avatar", "avatar is required", (value) => {
        if (!value) return false;
        const REGEX = /(image\/jpeg|image\/jpg|image\/png)/i;
        return REGEX.test(value.type);
      }),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      mutation.mutate(formData);
    },
  });

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1 className="text-center text-lg font-semibold">Create your account</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={`w-full rounded-lg p-3 shadow ${
              formik.touched.firstname && formik.errors.firstname
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="firstname"
            name="firstname"
            type="text"
            placeholder="Enter first name"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`w-full rounded-lg p-3 shadow ${
              formik.touched.lastname && formik.errors.lastname
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter last name"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <input
          className={`w-full rounded-lg p-3 shadow ${
            formik.touched.username && formik.errors.username
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
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
          placeholder="Enter password (at least 6 characters)"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            formik.touched.avatar && formik.errors.avatar
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="avatar"
        >
          <div className="mx-auto h-36 w-36 shrink-0">
            <img
              className="h-full w-full rounded-full bg-yellow-100 object-cover"
              src={
                formik.values.avatar && !formik.errors.avatar
                  ? URL.createObjectURL(formik.values.avatar)
                  : "./person.svg"
              }
            />
          </div>
          <h2 className="text-center text-xl text-gray-700">
            Choose profile picture
          </h2>
          <p className="text-center text-gray-500">
            Upload or drag & drop your file PNG, JPG or JPEG
          </p>
          <input
            className="absolute -z-10 opacity-0"
            id="avatar"
            name="avatar"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("avatar", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
        </label>
        <button
          className="block w-full rounded-lg bg-yellow-300 p-3 font-semibold shadow shadow hover:bg-yellow-400 focus:outline-none"
          type="submit"
        >
          Sign up
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
