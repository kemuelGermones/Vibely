import { FirebaseError } from "@firebase/util";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

function handleError(error) {
  const capitalize = (msg) => {
    const reduced = msg.replace(/[^a-z0-9 ]/gi, "");
    const firstChar = reduced.charAt(0).toUpperCase();
    const remainingChar = reduced.slice(1);
    return firstChar.concat(remainingChar);
  };

  if (error instanceof FirebaseError) {
    const auth = error.code.split("/")[1];
    const code = auth.replace(/-/g, " ");
    const message = capitalize(code);
    toast.error(message);
    return;
  }

  if (error instanceof AxiosError) {
    const response = error.response
      ? error.response.data.message
      : error.message;
    const message = capitalize(response);
    toast.error(message);
    return;
  }

  toast.error("Something went wrong");
}

export default handleError;
