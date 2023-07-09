const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { hashPassword } = require("../middleware/hash");
const { signup, signin } = require("../controllers/user");
const {
  validateAvatar,
  validateSignup,
  validateSignin,
} = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  multerSignup,
  validateSignup,
  validateAvatar,
  uploadAvatar,
  hashPassword,
  wrapAsync(signup)
);

router.post("/signin", validateSignin, wrapAsync(signin));

module.exports = router;
