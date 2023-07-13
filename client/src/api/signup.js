import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../config/firebase";

async function signup(values) {
  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  await axios.post("http://localhost:5000/signup", formData);
  await signInWithEmailAndPassword(auth, values.email, values.password);
}

export default signup;
