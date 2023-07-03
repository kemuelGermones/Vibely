const multer = require("multer");
const storage = multer.memoryStorage();
const AppError = require("../utils/AppError");

const upload = multer({
  storage,
  limits: {
    files: 5,
  },
  fileFilter(req, file, cb) {
    const WHITELIST = ["image/png", "image/jpeg", "image/jpg"];
    if (!WHITELIST.includes(file.mimetype)) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
});

module.exports.multerCreatePost = (req, res, next) => {
  const parse = upload.array("images");
  parse(req, res, (error) => {
    if (error) {
      next(new AppError(error.message, 400));
    }
    next();
  });
};

module.exports.multerSignup = (req, res, next) => {
  const parse = upload.single("avatar");
  parse(req, res, (error) => {
    if (error) {
      next(new AppError(error.message, 400));
    }
    next();
  });
};
