const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment");
const {
  validatePostExistence,
  validateCommentExistence,
  validateCommentDescription,
  validateCommentOwner,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, validatePostExistence, wrapAsync(getComments));

router.post(
  "/",
  authenticate,
  validatePostExistence,
  validateCommentDescription,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId",
  authenticate,
  validateCommentExistence,
  validateCommentOwner,
  wrapAsync(deleteComment)
);

module.exports = router;
