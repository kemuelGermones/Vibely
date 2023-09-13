const { followUser, unfollowUser } = require("../controllers/follow");
const {
  validateUserId,
  validateFollowAvailability,
  validateFollowAssociation,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validateUserId,
  validateFollowAvailability,
  wrapAsync(followUser)
);

router.delete(
  "/",
  authenticate,
  validateUserId,
  validateFollowAssociation,
  wrapAsync(unfollowUser)
);

module.exports = router;
