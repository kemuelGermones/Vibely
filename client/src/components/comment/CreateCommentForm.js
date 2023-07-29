import { useFormik } from "formik";
import * as yup from "yup";

function CreateCommentForm() {
  const { touched, errors, values, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        description: "",
      },
      validationSchema: yup.object({
        description: yup.string().required(),
      }),
      onSubmit: (data) => {
        console.log(data);
      },
    });

  return (
    <div className="flex gap-3">
      <div className="h-12 w-12 shrink-0">
        <img
          className="h-full w-full rounded-full object-cover"
          src="https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
        <textarea
          className={`w-full resize-none rounded-lg p-3 shadow ${
            touched.description && errors.description
              ? "border-red-500 bg-[url('../public/warning.svg')] bg-[length:1.3rem] bg-[right_0.5rem_top_0.5rem] bg-no-repeat focus:border-red-500 focus:ring-red-500"
              : "border-yellow-300 focus:border-yellow-300 focus:ring-yellow-300"
          }`}
          id="description"
          name="description"
          type="text"
          placeholder="Add comment"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          className={`w-full rounded-lg bg-yellow-300 p-2 font-semibold shadow ${
            false ? "" : "hover:bg-yellow-400"
          } focus:outline-none"`}
          type="submit"
          disabled={false}
        >
          {false ? "Loading..." : "Comment"}
        </button>
      </form>
    </div>
  );
}

export default CreateCommentForm;
