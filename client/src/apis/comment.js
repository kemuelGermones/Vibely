import { getIdToken } from "firebase/auth";

import auth from "../configs/firebase";
import server from "../configs/axios";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const createComment = async ({ postId, values }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.post(`/posts/${postId}/comments`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async ({ postId, page }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get(`/posts/${postId}/comments`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const deleteComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.delete(`/posts/${postId}/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
