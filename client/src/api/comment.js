import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const createComment = async ({ postId, values }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/posts/${postId}/comments`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async ({ postId, pageParam }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/posts/${postId}/comments`,
    {
      params: { page: pageParam },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const deleteComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(
    `http://localhost:5000/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
