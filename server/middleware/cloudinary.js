const DatauriParser = require("datauri/parser");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const AppError = require("../utils/AppError");

const parser = new DatauriParser();

module.exports.uploadImagesToCloudinary = (req, res, next) => {
  const dataUris = req.files.map(
    (file) =>
      parser.format(path.extname(file.originalname), file.buffer).content
  );

  const upload = dataUris.map(
    async (image) =>
      await cloudinary.uploader.upload(image, {
        resource_type: "image",
        folder: "Vibely",
        allowed_formats: "jpg, png, jpeg",
        transformation: [
          {
            width: 614,
            height: 345,
            crop: "fill",
            gravity: "auto",
            quality: "100",
          },
        ],
      })
  );

  Promise.all(upload)
    .then((images) => {
      req.files = images.map((image) => ({
        url: image.url,
        filename: image.public_id,
      }));
      next();
    })
    .catch((error) => {
      console.log("error");
      const { http_code, message } = error;
      next(new AppError(http_code, message));
    });
};

module.exports.uploadAvatarToCloudinary = (req, res, next) => {
  const dataUri = parser.format(
    path.extname(req.file.originalname),
    req.file.buffer
  ).content;

  cloudinary.uploader
    .upload(dataUri, {
      resource_type: "image",
      folder: "Vibely",
      allowed_formats: "jpg, png, jpeg",
      transformation: [
        {
          width: 40,
          height: 40,
          crop: "fill",
          radius: "max",
          quality: "100",
        },
      ],
    })
    .then((avatar) => {
      req.file = { url: avatar.url, filename: avatar.public_id };
      next();
    })
    .catch((error) => {
      const { http_code, message } = error;
      next(new AppError(http_code, message));
    });
};
