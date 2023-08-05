const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { signup } = require("../controllers/auth");
const { validateSignup } = require("../middleware/validate");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post(
  "/signup",
  multerSignup,
  validateSignup,
  uploadAvatar,
  wrapAsync(signup)
);

module.exports = router;
