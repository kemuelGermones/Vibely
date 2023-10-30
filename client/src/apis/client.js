import { getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";

import server from "../configs/axios";
import auth from "../configs/firebase";
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

export const getContacts = async ({ page }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get(`/contacts`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};
