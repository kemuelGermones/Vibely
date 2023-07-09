const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { signup } = require("../controllers/user");
const { validateAvatar, validateSignup } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  multerSignup,
  validateSignup,
  validateAvatar,
  uploadAvatar,
  wrapAsync(signup)
);

module.exports = router;
