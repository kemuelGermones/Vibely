import { getIdToken } from "firebase/auth";

import server from "../configs/axios";
import auth from "../configs/firebase";
import handleFirebaseAsync from "../utils/handleFirebaseAsync";

export const createPost = async (values) => {
  const formValues = new FormData();

  for (let value in values) {
    const result = Array.isArray(values[value]);
    if (result) {
      values[value].forEach((values) => {
        formValues.append(value, values);
      });
    } else {
      formValues.append(value, values[value]);
    }
  }

  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.post("/posts", formValues, {
    headers: {
      "Content-Type": "multipart/form-values",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPosts = async ({ page, search }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  const response = await server.get("/posts", {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const updatePost = async ({ postId, values }) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.patch(`/posts/${postId}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = async (postId) => {
  const user = auth.currentUser;
  const token = await handleFirebaseAsync(getIdToken.bind(null, user));

  await server.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
