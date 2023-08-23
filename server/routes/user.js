const {
  getUser,
  getUsers,
  followUser,
  unfollowUser,
} = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const {
  validateUserId,
  validateFollowee,
  validateFollowerToFolloweeAssociation,
} = require("../middleware/validate");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getUsers));

router.get("/:userId", authenticate, validateUserId, wrapAsync(getUser));

router.post(
  "/:userId/follows",
  authenticate,
  validateUserId,
  validateFollowee,
  wrapAsync(followUser)
);

router.delete(
  "/:userId/follows",
  authenticate,
  validateUserId,
  validateFollowerToFolloweeAssociation,
  wrapAsync(unfollowUser)
);

module.exports = router;
