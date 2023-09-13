const { likeComment, unlikeComment } = require("../controllers/commentLike");
const {
  validateCommentExistence,
  validateCommentLikeAvailability,
  validateCommentLikeExistence,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validateCommentExistence,
  validateCommentLikeAvailability,
  wrapAsync(likeComment)
);

router.delete(
  "/",
  authenticate,
  validateCommentLikeExistence,
  wrapAsync(unlikeComment)
);

module.exports = router;
