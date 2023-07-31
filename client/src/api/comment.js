import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const createComment = async ({ id, data }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/posts/${id}/comments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async ({ id, pageParam }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/posts/${id}/comments?page=${pageParam}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};
