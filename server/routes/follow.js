const { followUser, unfollowUser } = require("../controllers/follow");
const {
  validateUserExistence,
  validateFollowAvailability,
  validateFollowExistence,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticate,
  validateUserExistence,
  validateFollowAvailability,
  wrapAsync(followUser)
);

router.delete(
  "/",
  authenticate,
  validateFollowExistence,
  wrapAsync(unfollowUser)
);

module.exports = router;
