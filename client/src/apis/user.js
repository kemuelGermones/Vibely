import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const getUser = async (userId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(`http://localhost:5000/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const getUsers = async ({ page, search }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios("http://localhost:5000/users", {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};
