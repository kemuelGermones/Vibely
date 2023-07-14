require("dotenv").config();

const { User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const admin = require("../config/firebase");
const AppError = require("../utils/AppError");

module.exports.signup = async (req, res) => {
  const doesUserExist = await User.findOne({
    where: { email: req.body.email },
  });

  if (doesUserExist) {
    throw new AppError(400, "user exist already");
  }

  await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        avatar: req.file,
      },
      { include: [Avatar], transaction: t }
    );

    await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      uid: user.id,
    });
  });

  res.status(200).json({
    status: 200,
    data: null,
    message: "successfully created a user",
  });
};
