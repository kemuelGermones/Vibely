import { getIdToken } from "firebase/auth";

import auth from "../configs/firebase";
import server from "../configs/axios";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const likeComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.post(`/posts/${postId}/comments/${commentId}/likes`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlikeComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.delete(`/posts/${postId}/comments/${commentId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
