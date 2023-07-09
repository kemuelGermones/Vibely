require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User, Avatar } = require("../models");
const AppError = require("../utils/AppError");

const SECRET = process.env.SECRET;
const EXPIRATION = 60 * 60 * 24 * 7;

module.exports.signup = async (req, res) => {
  const doesUserExist = await User.findOne({
    where: { email: req.body.email },
  });

  if (doesUserExist) {
    throw new AppError("user exists already", 400);
  }

  const user = await User.create(
    { ...req.body, avatar: req.file },
    { include: [Avatar] }
  );

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: EXPIRATION,
  });

  res
    .status(200)
    .json({ id, token: `Bearer ${token}`, expiration: EXPIRATION });
};

module.exports.signin = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    throw new AppError("user doesn't exists", 400);
  }

  const result = await bcrypt.compare(req.body.password, user.password);

  if (!result) {
    throw new AppError("incorrect password", 400);
  }

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: EXPIRATION,
  });

  res.status(200).json({
    id: user.id,
    token: `Bearer ${token}`,
    expiration: EXPIRATION,
  });
};
