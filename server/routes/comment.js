const express = require("express");
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comment");
const { validateComment } = require("../middleware/validate");
const { isCommentOwner } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  wrapAsync(getComments)
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateComment,
  wrapAsync(createComment)
);

router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  isCommentOwner,
  wrapAsync(deleteComment)
);

module.exports = router;
