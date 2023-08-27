const {
  getUser,
  getUsers,
  followUser,
  unfollowUser,
} = require("../controllers/user");
const {
  validateUserId,
  validateFollowee,
  validateFollowerToFolloweeAssociation,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getUsers));

router.get("/:userId", authenticate, validateUserId, wrapAsync(getUser));

router.post(
  "/:userId/follow",
  authenticate,
  validateUserId,
  validateFollowee,
  wrapAsync(followUser)
);

router.delete(
  "/:userId/unfollow",
  authenticate,
  validateUserId,
  validateFollowerToFolloweeAssociation,
  wrapAsync(unfollowUser)
);

module.exports = router;
