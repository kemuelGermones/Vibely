const { followUser, unfollowUser } = require("../controllers/follow");
const {
  validateUserExistence,
  validateFollowAvailability,
  validateFollowExistence,
} = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authenticateRoute,
  validateUserExistence,
  validateFollowAvailability,
  wrapAsync(followUser)
);

router.delete(
  "/",
  authenticateRoute,
  validateFollowExistence,
  wrapAsync(unfollowUser)
);

module.exports = router;
