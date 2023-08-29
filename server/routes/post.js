const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post");
const {
  validatePostId,
  validatePostOwner,
  validatePostCaption,
  validatePostImages,
  validatePostLikeAvailability,
  validatePostLikeAssociation,
} = require("../middleware/validate");
const { uploadImages } = require("../middleware/cloudinary");
const { multerCreatePost } = require("../middleware/multer");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getPosts));

router.post(
  "/",
  authenticate,
  multerCreatePost,
  validatePostCaption,
  validatePostImages,
  uploadImages,
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

router.post(
  "/:postId/like",
  authenticate,
  validatePostId,
  validatePostLikeAvailability,
  wrapAsync(likePost)
);

router.delete(
  "/:postId/unlike",
  authenticate,
  validatePostId,
  validatePostLikeAssociation,
  wrapAsync(unlikePost)
);

module.exports = router;
