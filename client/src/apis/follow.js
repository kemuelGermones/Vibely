import { getIdToken } from "firebase/auth";

import auth from "../configs/firebase";
import server from "../configs/axios";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const followUser = async (userId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.post(`/users/${userId}/follows`, undefined, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const unfollowUser = async (userId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.delete(`/users/${userId}/follows`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
