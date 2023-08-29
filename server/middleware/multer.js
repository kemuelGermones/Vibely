const multer = require("multer");
const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const WHITELIST = ["image/png", "image/jpeg", "image/jpg"];

  if (!WHITELIST.includes(file.mimetype)) {
    return cb(new Error("file type is invalid"));
  }

  cb(null, true);
};

module.exports.parseCreatePostFormData = (req, res, next) => {
  const limits = { files: 5 };
  const upload = multer({ storage, limits, fileFilter });
  const parse = upload.array("images");

  parse(req, res, (error) => {
    if (error) {
      next(new AppError(400, error.message));
    }
    next();
  });
};

module.exports.parseSignupFormData = (req, res, next) => {
  const upload = multer({ storage, fileFilter });
  const parse = upload.single("avatar");

  parse(req, res, (error) => {
    if (error) {
      next(new AppError(400, error.message));
    }
    next();
  });
};
