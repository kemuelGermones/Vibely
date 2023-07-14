const multer = require("multer");

const AppError = require("../utils/AppError");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    files: 5,
  },
  fileFilter(req, file, cb) {
    const WHITELIST = ["image/png", "image/jpeg", "image/jpg"];

    if (!WHITELIST.includes(file.mimetype)) {
      return cb(new Error("file type is invalid"));
    }

    cb(null, true);
  },
});

module.exports.multerCreatePost = (req, res, next) => {
  const parse = upload.array("images");

  parse(req, res, (error) => {
    if (error) {
      next(new AppError(400, error.message));
    }

    next();
  });
};

module.exports.multerSignup = (req, res, next) => {
  const parse = upload.single("avatar");

  parse(req, res, (error) => {
    if (error) {
      next(new AppError(400, error.message));
    }

    next();
  });
};
