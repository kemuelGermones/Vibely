const { getUser, getUsers } = require("../controllers/user");
const { validateUserExistence } = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getUsers));

router.get("/:userId", authenticate, validateUserExistence, wrapAsync(getUser));

module.exports = router;
