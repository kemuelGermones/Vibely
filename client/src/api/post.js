import { getIdToken } from "firebase/auth";
import axios from "axios";

import { auth } from "../config/firebase";

export const createPost = async (values) => {
  const formData = new FormData();

  for (let value in values) {
    const result = Array.isArray(values[value]);
    if (result) {
      values[value].forEach((data) => {
        formData.append(value, data);
      });
    } else {
      formData.append(value, values[value]);
    }
  }

  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.post("http://localhost:5000/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPosts = async ({ pageParam = 0 }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  const response = await axios(
    `http://localhost:5000/posts?page=${pageParam}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response;
};

export const updatePost = async ({ id, data }) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.patch(`http://localhost:5000/posts/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = async (id) => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  await axios.delete(`http://localhost:5000/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
