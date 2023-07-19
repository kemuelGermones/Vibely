function firebaseError(error) {
  const auth = error.code.split("/")[1];

  const code = auth.replace(/-/g, " ");

  return code.charAt(0).toUpperCase().concat(code.slice(1));
}

export default firebaseError;
