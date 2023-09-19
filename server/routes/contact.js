const { getContacts } = require("../controllers/contact");
const { authenticate } = require("../middleware/auth");
const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.get("/", authenticate, wrapAsync(getContacts));

module.exports = router;
