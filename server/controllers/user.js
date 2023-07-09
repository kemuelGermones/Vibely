require("dotenv").config();

const { User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const admin = require("../config/firebase");
const AppError = require("../utils/AppError");

module.exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const doesUserExist = await User.findOne({ where: { email } });

  if (doesUserExist) {
    throw new AppError("user exists already", 400);
  }

  await sequelize.transaction(async (t) => {
    const user = await User.create(
      { firstname, lastname, username, email, avatar: req.file },
      { include: [Avatar], transaction: t }
    );

    await admin.auth().createUser({
      email,
      password,
      uid: user.id,
    });
  });

  res.status(200).json({ status: 200, message: "successful sign up" });
};
