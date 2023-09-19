import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

export const getContacts = async ({ page }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(`http://localhost:5000/contacts`, {
    params: { page },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};
