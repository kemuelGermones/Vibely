const { likePost, unlikePost } = require("../controllers/postLike");
const {
  validatePostExistence,
  validatePostLikeAvailability,
  validatePostLikeExistence,
} = require("../middleware/validate");
const { authenticateRoute } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticateRoute,
  validatePostExistence,
  validatePostLikeAvailability,
  wrapAsync(likePost)
);

router.delete(
  "/",
  authenticateRoute,
  validatePostLikeExistence,
  wrapAsync(unlikePost)
);

module.exports = router;
