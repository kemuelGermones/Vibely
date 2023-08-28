import { FirebaseError } from "@firebase/util";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function handleError(error) {
  if (error instanceof FirebaseError) {
    const auth = error.code.split("/")[1];
    const message = auth.replace(/-/g, " ");
    toast.error(message);
    return;
  }

  if (error instanceof AxiosError) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    toast.error(message);
    return;
  }

  toast.error("Something went wrong");
}

export default handleError;
