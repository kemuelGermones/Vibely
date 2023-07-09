const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
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
  wrapAsync(signup)
);

router.post("/signin", validateSignin, wrapAsync(signin));

module.exports = router;
