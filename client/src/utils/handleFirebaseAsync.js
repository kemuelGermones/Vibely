import { FirebaseError } from "firebase/app";

function handleFirebaseAsync(fn) {
  return new Promise((resolve, reject) => {
    fn()
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const { code, customData } = error;
        const info = code.split("/")[1];
        const char = info.charAt(0).toUpperCase();
        const message = char.concat(info.slice(1)).replace(/-/g, " ");
        reject(new FirebaseError(code, message, customData));
      });
  });
}

export default handleFirebaseAsync;
