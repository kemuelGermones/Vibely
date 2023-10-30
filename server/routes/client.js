const express = require("express");

const {
  validateUserBody,
  validateUsernameAvailability,
  validateEmailAvailability,
} = require("../middlewares/validate");
const { parseSignupFormData } = require("../middlewares/multer");
const { uploadAvatarToCloudinary } = require("../middlewares/cloudinary");
const { authenticateRoute } = require("../middlewares/auth");
const { signup, getContacts } = require("../controllers/client");
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

router.get("/contacts", authenticateRoute, wrapAsync(getContacts));

module.exports = router;
