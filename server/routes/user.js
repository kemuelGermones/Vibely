const { getUser, getUserPosts } = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/:userId", authenticate, wrapAsync(getUser));

router.get("/:userId/posts", authenticate, wrapAsync(getUserPosts));

module.exports = router;
