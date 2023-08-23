const {
  getUser,
  getUsers,
  followUser,
  unfollowUser,
} = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const {
  validateFollowUser,
  validateUnfollowUser,
} = require("../middleware/validate");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/:userId", authenticate, wrapAsync(getUser));

router.get("/", authenticate, wrapAsync(getUsers));

router.post(
  "/:userId/follows",
  authenticate,
  validateFollowUser,
  wrapAsync(followUser)
);

router.delete(
  "/:userId/follows",
  authenticate,
  validateUnfollowUser,
  wrapAsync(unfollowUser)
);

module.exports = router;
