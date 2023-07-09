const express = require("express");
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const { uploadImages } = require("../middleware/cloudinary");
const { multerCreatePost } = require("../middleware/multer");
const { isPostOwner } = require("../middleware/auth");
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
  passport.authenticate("jwt", { session: false }),
  wrapAsync(getPosts)
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  multerCreatePost,
  validateCreatePost,
  uploadImages,
  wrapAsync(createPost)
);

router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  isPostOwner,
  validateUpdatePost,
  wrapAsync(updatePost)
);

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  isPostOwner,
  wrapAsync(deletePost)
);

module.exports = router;
