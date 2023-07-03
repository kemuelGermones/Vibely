const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const path = require("path");
const cloudinary = require("../config/cloudinary");

const UPLOAD_PRESET = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "vibely",
};

module.exports.uploadImages = (req, res, next) => {
  const dataUris = req.files.map(
    (file) =>
      parser.format(path.extname(file.originalname), file.buffer).content
  );
  const uploadImagesCloudinary = dataUris.map(
    async (image) => await cloudinary.uploader.upload(image, UPLOAD_PRESET)
  );
  Promise.all(uploadImagesCloudinary)
    .then((images) => {
      req.files = images.map((image) => ({
        url: image.url,
        filename: image.public_id,
      }));
      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.uploadAvatar = (req, res, next) => {
  const dataUri = parser.format(
    path.extname(req.file.originalname),
    req.file.buffer
  ).content;
  cloudinary.uploader
    .upload(dataUri, UPLOAD_PRESET)
    .then((avatar) => {
      req.file = { url: avatar.url, filename: avatar.public_id };
      next();
    })
    .catch((error) => {
      next(error);
    });
};
