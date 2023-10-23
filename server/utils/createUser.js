const AppError = require("./AppError");
const admin = require("../config/firebase");

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .createUser(user)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const { code } = error;
        const info = code.split("/")[1];
        const char = info.charAt(0).toUpperCase();
        const message = char.concat(info.slice(1)).replace(/-/g, " ");
        reject(new AppError(400, message));
      });
  });
};

module.exports = createUser;
