import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const createComment = async ({ postId, data }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/posts/${postId}/comments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async ({ postId, pageParam }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/posts/${postId}/comments?page=${pageParam}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};

export const deleteComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  console.log(postId);
  console.log(commentId);

  await axios.delete(
    `http://localhost:5000/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
