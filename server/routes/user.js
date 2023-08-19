const { getUser, getUsers } = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/:userId", authenticate, wrapAsync(getUser));

router.get("/", authenticate, wrapAsync(getUsers));

module.exports = router;
