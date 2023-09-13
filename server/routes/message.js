const { getMessages, createMessage } = require("../controllers/message");
const {
  validateUserId,
  validateMessageContent,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router({ mergeParams: true });

router.get("/", authenticate, validateUserId, wrapAsync(getMessages));

router.post(
  "/",
  authenticate,
  validateUserId,
  validateMessageContent,
  wrapAsync(createMessage)
);

module.exports = router;
