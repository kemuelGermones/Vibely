import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const signup = async (values) => {
  const formData = new FormData();

  Object.keys(values).forEach((value) => {
    formData.append(value, values[value]);
  });

  await axios.post("http://localhost:5000/signup", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  await signInWithEmailAndPassword(auth, values.email, values.password);
};

export const signin = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const signout = async () => {
  await signOut(auth);
};
