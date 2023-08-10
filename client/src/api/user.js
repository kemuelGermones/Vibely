import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const getUser = async (id) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(`http://localhost:5000/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getUserPosts = async ({ id, pageParam }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/users/${id}/posts?page=${pageParam}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};
