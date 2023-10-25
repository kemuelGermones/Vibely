const { likeComment, unlikeComment } = require("../controllers/commentLike");
const {
  validateCommentExistence,
  validateCommentLikeAvailability,
  validateCommentLikeExistence,
} = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticateRoute,
  validateCommentExistence,
  validateCommentLikeAvailability,
  wrapAsync(likeComment)
);

router.delete(
  "/",
  authenticateRoute,
  validateCommentLikeExistence,
  wrapAsync(unlikeComment)
);

module.exports = router;
