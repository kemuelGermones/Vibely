const AppError = require("./AppError");
const cloudinary = require("../config/cloudinary");

const destroyImages = (filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(filename)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        const { http_code, message } = error;
        reject(new AppError(http_code, message));
      });
  });
};

module.exports = destroyImages;
