import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const followUser = async (userId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post(`http://localhost:5000/users/${userId}/follows`, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unfollowUser = async (userId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(`http://localhost:5000/users/${userId}/follows`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
