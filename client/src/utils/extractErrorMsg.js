function extractErrorMsg(error) {
  const auth = error.code.split("/")[1];
  const code = auth.replace(/-/g, " ");
  const message = code.charAt(0).toUpperCase().concat(code.slice(1));
  return message;
}

export default extractErrorMsg;
