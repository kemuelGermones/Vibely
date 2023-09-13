const { getMessages, createMessage } = require("../controllers/message");
const {
  validateUserExistence,
  validateMessageContent,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, validateUserExistence, wrapAsync(getMessages));

router.post(
  "/",
  authenticate,
  validateUserExistence,
  validateMessageContent,
  wrapAsync(createMessage)
);

module.exports = router;
