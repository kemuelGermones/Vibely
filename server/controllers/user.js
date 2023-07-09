require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");

const { User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const AppError = require("../utils/AppError");

const SECRET = process.env.SECRET;
const EXPIRATION = 60 * 60 * 24 * 7;

module.exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  await sequelize.transaction(async (t) => {
    const user = await User.create(
      { firstname, lastname, username, email, password, avatar: req.file },
      { include: [Avatar], transaction: t }
    );

    await admin.auth().createUser({
      email,
      password,
      uid: user.id,
    });
  });

  res.status(200).json({ status: 200, message: "successful sign up"})
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
