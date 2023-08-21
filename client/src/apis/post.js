import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../configs/firebase";

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
  const token = await getIdToken(user);

  await axios.post("http://localhost:5000/posts", formValues, {
    headers: {
      "Content-Type": "multipart/form-values",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPosts = async ({ page, search }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios("http://localhost:5000/posts", {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.items;
};

export const updatePost = async ({ postId, values }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.patch(`http://localhost:5000/posts/${postId}`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = async (postId) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(`http://localhost:5000/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
