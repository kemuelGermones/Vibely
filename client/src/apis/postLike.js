import { getIdToken } from "firebase/auth";

import server from "../configs/axios";
import auth from "../configs/firebase";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const likePost = async (postId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.post(`/posts/${postId}/likes`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlikePost = async (postId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.delete(`/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
