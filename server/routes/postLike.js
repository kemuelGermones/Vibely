const { likePost, unlikePost } = require("../controllers/postLike");
const {
  validatePostExistence,
  validatePostLikeAvailability,
  validatePostLikeExistence,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validatePostExistence,
  validatePostLikeAvailability,
  wrapAsync(likePost)
);

router.delete(
  "/",
  authenticate,
  validatePostLikeExistence,
  wrapAsync(unlikePost)
);

module.exports = router;
