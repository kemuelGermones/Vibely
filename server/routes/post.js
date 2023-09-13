const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const {
  validatePostId,
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
  validatePostId,
  validatePostOwner,
  validatePostCaption,
  wrapAsync(updatePost)
);

router.delete(
  "/:postId",
  authenticate,
  validatePostId,
  validatePostOwner,
  wrapAsync(deletePost)
);

module.exports = router;
