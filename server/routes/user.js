const { getUser, getUsers } = require("../controllers/user");
const { validateUserId } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getUsers));

router.get("/:userId", authenticate, validateUserId, wrapAsync(getUser));

module.exports = router;
