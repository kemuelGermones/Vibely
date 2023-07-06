require("dotenv").config();
const { User, Avatar } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const SECRET = process.env.SECRET;
const EXPIRATION = 60 * 60 * 24 * 7;

module.exports.createUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) throw new AppError("user exists already", 400);
  const { id, email } = await User.create(
    { ...req.body, avatar: req.file },
    { include: [Avatar] }
  );
  const token = jwt.sign({ id, email }, SECRET, {
    expiresIn: EXPIRATION,
  });
  res
    .status(200)
    .json({ id, token: `Bearer ${token}`, expiration: EXPIRATION });
};

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: EXPIRATION,
      });
      res.status(200).json({
        id: user.id,
        token: `Bearer ${token}`,
        expiration: EXPIRATION,
      });
    } else {
      res.status(400).json({ status: 400, message: "incorrect password" });
    }
  } else {
    res.status(400).json({ status: 400, message: "user doesn't exists" });
  }
};
