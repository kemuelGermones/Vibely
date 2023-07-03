require("dotenv").config();
const { User, Avatar } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = process.env.SECRET;
const EXPIRATION = 60 * 60 * 24 * 7;

module.exports.createUser = async (req, res) => {
  const foundUser = await User.findOne({ where: { email: req.body.email } });
  if (!foundUser) {
    const user = await User.create(
      { ...req.body, avatar: req.file },
      { include: [Avatar] }
    );
    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn: EXPIRATION,
    });
    res.status(200).json({ token: `Bearer ${token}`, expiration: EXPIRATION });
  } else {
    res.status(200).json({ status: 400, message: "user exists already" });
  }
};

module.exports.loginUser = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = jwt.sign({ id: user.id }, SECRET, {
        expiresIn: EXPIRATION,
      });
      res
        .status(200)
        .json({ token: `Bearer ${token}`, expiration: EXPIRATION });
    } else {
      res.status(400).json({ status: 400, message: "incorrect password" });
    }
  } else {
    res.status(400).json({ status: 400, message: "user doesn't exists" });
  }
};
