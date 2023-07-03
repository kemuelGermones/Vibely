const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { hashPassword } = require("../middleware/hash");
const { createUser, loginUser } = require("../controllers/user");
const {
  validateAvatar,
  validateSignup,
  validateSignin,
} = require("../middleware/validate");

router.post(
  "/signup",
  multerSignup,
  validateSignup,
  validateAvatar,
  uploadAvatar,
  hashPassword,
  wrapAsync(createUser)
);

router.post("/signin", validateSignin, wrapAsync(loginUser));

module.exports = router;
