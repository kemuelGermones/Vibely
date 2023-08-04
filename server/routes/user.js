const { getUser } = require("../controllers/user");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/:userId", authenticate, wrapAsync(getUser));

module.exports = router;
