const { multerSignup } = require("../middleware/multer");
const { uploadAvatar } = require("../middleware/cloudinary");
const { signup, getUser } = require("../controllers/user");
const { validateSignup } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
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

router.get("/users/:userId", authenticate, wrapAsync(getUser));

module.exports = router;
