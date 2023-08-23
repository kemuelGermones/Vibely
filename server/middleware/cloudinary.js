const DatauriParser = require("datauri/parser");
const path = require("path");
const cloudinary = require("../config/cloudinary");

const parser = new DatauriParser();

module.exports.uploadImages = (req, res, next) => {
  const dataUris = req.files.map(
    (file) =>
      parser.format(path.extname(file.originalname), file.buffer).content
  );

  const uploadImagesCloudinary = dataUris.map(
    async (image) =>
      await cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: "Vibely",
        allowed_formats: "jpg, png, jpeg",
        transformation: [{ width: 1280, height: 720, crop: "fill" }],
      })
  );

  Promise.all(uploadImagesCloudinary)
    .then((images) => {
      req.files = images.map((image) => ({
        url: image.url,
        filename: image.public_id,
      }));
      next();
    })
    .catch((error) => next(error));
};

module.exports.uploadAvatar = (req, res, next) => {
  const dataUri = parser.format(
    path.extname(req.file.originalname),
    req.file.buffer
  ).content;

  cloudinary.uploader
    .upload(dataUri, {
      resource_type: "image",
      folder: "Vibely",
      allowed_formats: "jpg, png, jpeg",
    })
    .then((avatar) => {
      req.file = { url: avatar.url, filename: avatar.public_id };
      next();
    })
    .catch((error) => next(error));
};
