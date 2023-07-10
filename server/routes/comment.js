const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment");
const { validateComment } = require("../middleware/validate");
const { isCommentOwner, authenticate } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, wrapAsync(getComments));

router.post("/", authenticate, validateComment, wrapAsync(createComment));

router.delete(
  "/:commentId",
  authenticate,
  isCommentOwner,
  wrapAsync(deleteComment)
);

module.exports = router;
