import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import auth from "../configs/firebase";
import server from "../configs/axios";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const signup = async (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((value) => {
    formData.append(value, values[value]);
  });

  await server.post("/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  await handleFirebaseAsync(
    signInWithEmailAndPassword.bind(null, auth, values.email, values.password)
  );
};

export const signin = async ({ email, password }) => {
  await handleFirebaseAsync(
    signInWithEmailAndPassword.bind(null, auth, email, password)
  );
};

export const signout = async () => {
  await handleFirebaseAsync(signOut.bind(null, auth));
};
