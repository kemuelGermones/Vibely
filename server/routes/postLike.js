const { likePost, unlikePost } = require("../controllers/postLike");
const {
  validatePostId,
  validatePostLikeAvailability,
  validatePostLikeAssociation,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validatePostId,
  validatePostLikeAvailability,
  wrapAsync(likePost)
);

router.delete(
  "/",
  authenticate,
  validatePostId,
  validatePostLikeAssociation,
  wrapAsync(unlikePost)
);

module.exports = router;
