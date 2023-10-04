const { getUser, getContacts, getUsers } = require("../controllers/user");
const { validateUserExistence } = require("../middleware/validate");
const { authenticateRoute } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticateRoute, wrapAsync(getUsers));

router.get("/contacts", authenticateRoute, wrapAsync(getContacts));

router.get(
  "/:userId",
  authenticateRoute,
  validateUserExistence,
  wrapAsync(getUser)
);

module.exports = router;
