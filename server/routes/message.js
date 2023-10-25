const { getMessages } = require("../controllers/message");
const {
  validateUserExistence,
} = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticateRoute, validateUserExistence, wrapAsync(getMessages));

module.exports = router;
