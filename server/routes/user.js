const { getUser, getUsers } = require("../controllers/user");
const { validateUserExistence } = require("../middlewares/validate");
const { authenticateRoute } = require("../middlewares/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticateRoute, wrapAsync(getUsers));

router.get(
  "/:userId",
  authenticateRoute,
  validateUserExistence,
  wrapAsync(getUser)
);

module.exports = router;
