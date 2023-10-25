import { getIdToken } from "firebase/auth";

import auth from "../configs/firebase";
import server from "../configs/axios";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const getUsers = async ({ page, search }) => {
  if (!search) {
    return new Array();
  }

  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get("/users", {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const getContacts = async ({ page }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get(`/users/contacts`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const getUser = async (userId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};
