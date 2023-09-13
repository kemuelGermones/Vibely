const { likeComment, unlikeComment } = require("../controllers/commentLike");
const {
  validatePostId,
  validateCommentId,
  validateCommentLikeAvailability,
  validateCommentLikeAssociation,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validatePostId,
  validateCommentId,
  validateCommentLikeAvailability,
  wrapAsync(likeComment)
);

router.delete(
  "/",
  authenticate,
  validatePostId,
  validateCommentId,
  validateCommentLikeAssociation,
  wrapAsync(unlikeComment)
);

module.exports = router;
