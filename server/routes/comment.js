const {
  getComments,
  createComment,
  deleteComment,
  likeComment,
  unlikeComment
} = require("../controllers/comment");
const {
  validatePostId,
  validateCommentId,
  validateCommentDescription,
  validateCommentOwner,
  validateCommentLikeAvailability,
  validateCommentLikeAssociation,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, validatePostId, wrapAsync(getComments));

router.post(
  "/",
  authenticate,
  validatePostId,
  validateCommentDescription,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId",
  authenticate,
  validatePostId,
  validateCommentId,
  validateCommentOwner,
  wrapAsync(deleteComment)
);

router.post(
  "/:commentId/like",
  authenticate,
  validatePostId,
  validateCommentId,
  validateCommentLikeAvailability,
  wrapAsync(likeComment)
);

router.delete(
  "/:commentId/unlike",
  authenticate,
  validatePostId,
  validateCommentId,
  validateCommentLikeAssociation,
  wrapAsync(unlikeComment)
);

module.exports = router;
