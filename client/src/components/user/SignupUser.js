import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import toBase64 from "../../utils/toBase64";

const BASE64_IMAGE_REGEXP =
  /data:image\/[bmp,gif,ico,jpg,png,svg,webp,x\-icon,svg+xml]+;base64,[a-zA-Z0-9,+,/]+={0,2}/m;

function SignupUser() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      image: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      image: yup.string().matches(BASE64_IMAGE_REGEXP).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const setImageField = async (event) => {
    const imageBase64 = await toBase64(event.currentTarget.files[0]);
    formik.setFieldValue("image", imageBase64);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 shadow">
      <h1 className="text-center text-lg font-semibold">Create your account</h1>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className={`w-full rounded-lg p-3 shadow ${
              formik.touched.firstName && formik.errors.firstName
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <input
            className={`w-full rounded-lg p-3 shadow ${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_center] bg-no-repeat focus:border-red-500 focus:ring-red-500"
                : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
            }`}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter last name"
            value={formik.values.lastName}
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
          placeholder="Enter password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label
          className={`relative block flex w-full cursor-pointer flex-col gap-3 rounded-lg border p-6 shadow ${
            formik.touched.image && formik.errors.image
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat"
              : "border-yellow-300"
          }`}
          htmlFor="image"
        >
          <div className="mx-auto h-36 w-36 shrink-0">
            <img
              className="h-full w-full rounded-full bg-yellow-100 object-cover"
              src={
                formik.values.image && !formik.errors.image
                  ? formik.values.image
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
            id="image"
            name="image"
            type="file"
            onChange={setImageField}
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
          to="/login"
        >
          log in
        </Link>
      </p>
    </div>
  );
}

export default SignupUser;
