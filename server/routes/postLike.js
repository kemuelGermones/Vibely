const express = require("express");

const {
  validatePostExistence,
  validatePostLikeAvailability,
  validatePostLikeExistence,
} = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const { likePost, unlikePost } = require("../controllers/postLike");
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
