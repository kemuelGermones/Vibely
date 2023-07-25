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

  let message;

  if (error instanceof FirebaseError) {
    const auth = error.code.split("/")[1];
    message = auth.replace(/-/g, " ");
  } else if (error instanceof AxiosError) {
    message = error.response.data.message;
  }

  message = message ? capitalize(message) : "Something went wrong";

  toast.error(message);
}

export default handleError;
