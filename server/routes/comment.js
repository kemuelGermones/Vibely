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
} = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticateRoute, validatePostExistence, wrapAsync(getComments));

router.post(
  "/",
  authenticateRoute,
  validatePostExistence,
  validateCommentDescription,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId",
  authenticateRoute,
  validateCommentExistence,
  validateCommentOwner,
  wrapAsync(deleteComment)
);

module.exports = router;
