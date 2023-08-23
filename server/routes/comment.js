const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment");
const {
  validatePostId,
  validateCommentId,
  validateCommentDescription,
  validateCommentOwner,
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

module.exports = router;
