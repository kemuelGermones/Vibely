const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const { uploadImages } = require("../middleware/cloudinary");
const { multerCreatePost } = require("../middleware/multer");
const { isPostOwner, authenticate } = require("../middleware/auth");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const {
  validateCreatePost,
  validateUpdatePost,
} = require("../middleware/validate");

const router = express.Router();

router.get(
  "/",
  authenticate,
  wrapAsync(getPosts)
);

router.post(
  "/",
  authenticate,
  multerCreatePost,
  validateCreatePost,
  uploadImages,
  wrapAsync(createPost)
);

router.put(
  "/:postId",
  authenticate,
  isPostOwner,
  validateUpdatePost,
  wrapAsync(updatePost)
);

router.delete(
  "/:postId",
  authenticate,
  isPostOwner,
  wrapAsync(deletePost)
);

module.exports = router;
