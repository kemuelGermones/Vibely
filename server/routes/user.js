const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { signup } = require("../controllers/user");
const { validateSignup } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/signup",
  multerSignup,
  validateSignup,
  uploadAvatar,
  wrapAsync(signup)
);

module.exports = router;
