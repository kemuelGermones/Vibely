import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const getMessages = async (userId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios(`http://localhost:5000/users/${userId}/messages`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createMessage = async ({ userId, values }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/users/${userId}/messages`, values, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
