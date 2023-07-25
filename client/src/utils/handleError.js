import { FirebaseError } from "@firebase/util";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function handleError(error) {
  let message;

  if (error instanceof FirebaseError) {
    const auth = error.code.split("/")[1];
    message = auth.replace(/-/g, " ");
  } else if (error instanceof AxiosError) {
    message = error.response.data.message;
  } else {
    message = "something went wrong";
  }

  toast.error(message);
}

export default handleError;
