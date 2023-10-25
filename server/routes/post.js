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
} = require("../middlewares/validate");
const { uploadImagesToCloudinary } = require("../middlewares/cloudinary");
const { parseCreatePostFormData } = require("../middlewares/multer");
const { authenticateRoute } = require("../middlewares/auth");
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
