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
const { authenticateRoute } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticateRoute, wrapAsync(getPosts));

router.post(
  "/",
  authenticateRoute,
  parseCreatePostFormData,
  validatePostCaption,
  validatePostImages,
  uploadImagesToCloudinary,
  wrapAsync(createPost)
);

router.patch(
  "/:postId",
  authenticateRoute,
  validatePostExistence,
  validatePostOwner,
  validatePostCaption,
  wrapAsync(updatePost)
);

router.delete(
  "/:postId",
  authenticateRoute,
  validatePostExistence,
  validatePostOwner,
  wrapAsync(deletePost)
);

module.exports = router;
