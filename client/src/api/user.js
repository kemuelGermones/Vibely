import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const getUser = async (userId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(`http://localhost:5000/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getUserPosts = async ({ userId, pageParam }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/users/${userId}/posts?page=${pageParam}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
