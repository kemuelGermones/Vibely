const {
  validateUserBody,
  validateUsernameAvailability,
  validateEmailAvailability,
} = require("../middlewares/validate");
const { parseSignupFormData } = require("../middlewares/multer");
const { uploadAvatarToCloudinary } = require("../middlewares/cloudinary");
const { signup } = require("../controllers/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post(
  "/signup",
  parseSignupFormData,
  validateUserBody,
  validateUsernameAvailability,
  validateEmailAvailability,
  uploadAvatarToCloudinary,
  wrapAsync(signup)
);

module.exports = router;
