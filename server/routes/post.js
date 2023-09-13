const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const {
  validatePostExistence,
  validatePostOwner,
  validatePostCaption,
  validatePostImages,
} = require("../middleware/validate");
const { uploadImagesToCloudinary } = require("../middleware/cloudinary");
const { parseCreatePostFormData } = require("../middleware/multer");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getPosts));

router.post(
  "/",
  authenticate,
  parseCreatePostFormData,
  validatePostCaption,
  validatePostImages,
  uploadImagesToCloudinary,
  wrapAsync(createPost)
);

router.patch(
  "/:postId",
  authenticate,
  validatePostExistence,
  validatePostOwner,
  validatePostCaption,
  wrapAsync(updatePost)
);

router.delete(
  "/:postId",
  authenticate,
  validatePostExistence,
  validatePostOwner,
  wrapAsync(deletePost)
);

module.exports = router;
