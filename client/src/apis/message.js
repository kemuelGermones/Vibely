import { getIdToken } from "firebase/auth";

import server from "../configs/axios";
import auth from "../configs/firebase";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const getMessages = async ({ userId, page }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get(`/users/${userId}/messages`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};
