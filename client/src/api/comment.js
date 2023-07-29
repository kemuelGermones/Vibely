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
