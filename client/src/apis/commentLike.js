import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const likeComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(
    `http://localhost:5000/posts/${postId}/comments/${commentId}/likes`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const unlikeComment = async ({ postId, commentId }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(
    `http://localhost:5000/posts/${postId}/comments/${commentId}/likes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};