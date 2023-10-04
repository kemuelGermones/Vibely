const { likeComment, unlikeComment } = require("../controllers/commentLike");
const {
  validateCommentExistence,
  validateCommentLikeAvailability,
  validateCommentLikeExistence,
} = require("../middleware/validate");
const { authenticateRoute } = require("../middleware/auth");
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
