const {
  validateUserBody,
  validateUsernameAvailability,
  validateUserAvailability,
} = require("../middleware/validate");
const { parseSignupFormData } = require("../middleware/multer");
const { uploadAvatarToCloudinary } = require("../middleware/cloudinary");
const { signup } = require("../controllers/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post(
  "/signup",
  parseSignupFormData,
  validateUserBody,
  validateUsernameAvailability,
  validateUserAvailability,
  uploadAvatarToCloudinary,
  wrapAsync(signup)
);

module.exports = router;
