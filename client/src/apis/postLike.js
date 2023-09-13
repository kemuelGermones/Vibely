import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const likePost = async (postId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/posts/${postId}/likes`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unlikePost = async (postId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(`http://localhost:5000/posts/${postId}/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
