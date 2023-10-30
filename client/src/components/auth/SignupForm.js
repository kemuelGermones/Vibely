import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { signup } from "../../apis/client";
import validateAvatar from "../../utils/validateAvatar";
import validateHtml from "../../utils/validateHtml";
import FileInput from "../ui/FileInput";

function SignupForm() {
  const { mutate, isLoading } = useMutation(signup, {
    onError: (error) => {
      toast.error(error.message, { theme: "colored" });
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
      firstname: yup
        .string()
        .min(2)
        .max(30)
        .matches(/^[a-z]+$/i)
        .test("firstname", "Firstname is invalid", validateHtml)
        .required(),
      lastname: yup
        .string()
        .min(2)
        .max(30)
        .matches(/^[a-z]+$/i)
        .test("lastname", "Lastname is invalid", validateHtml)
        .required(),
      username: yup
        .string()
        .min(2)
        .max(30)
        .matches(/^[a-z]+$/i)
        .test("username", "Username is invalid", validateHtml)
        .required(),
      email: yup
        .string()
        .email()
        .test("email", "Email is invalid", validateHtml)
        .required(),
      password: yup.string().min(6).required(),
      avatar: yup
        .mixed()
        .test("avatar", "Avatar is invalid", validateAvatar)
        .required(),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleOnChangeAvatar = (event) => {
    setFieldValue("avatar", event.currentTarget.files[0]);
  };

  return (
    <form className="card flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="text-center font-shrikhand text-2xl">Vibely</div>
      <div className="rounded-lg bg-yellow-200 p-3 text-sm text-gray-500">
        Note: Firstname, lastname and username should only contain alphabets
        with a minimum of 2 characters and a maximum of 30 characters. Also,
        password must contain atleast 6 characters.
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          className={
            touched.firstname && errors.firstname
              ? "input-warning w-full"
              : "input-primary w-full"
          }
          id="firstname"
          name="firstname"
          type="text"
          placeholder="Enter firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <input
          className={
            touched.lastname && errors.lastname
              ? "input-warning w-full"
              : "input-primary w-full"
          }
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Enter lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <input
        className={
          touched.username && errors.username
            ? "input-warning"
            : "input-primary"
        }
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
      <FileInput
        hasError={touched.avatar && errors.avatar}
        title="Choose profile picture"
        description="Accepted file formats: JPG, PNG, and JPEG, with a 4MB size limit."
        id="avatar"
        name="avatar"
        multiple={false}
        onChange={handleOnChangeAvatar}
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
            alt="Profile picture"
          />
        </div>
      </FileInput>
      <button className="btn-primary" type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <div className="text-center">
        Have an account?{" "}
        <Link
          className="text-blue-600 underline underline-offset-4"
          to="/signin"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
