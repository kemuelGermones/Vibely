require("dotenv").config();

const { User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const admin = require("../config/firebase");

module.exports.signup = async (req, res) => {
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
    items: null,
    message: "successfully created a user",
  });
};

module.exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Avatar,
        as: "avatar",
        attributes: { exclude: ["userId"] },
      },
    ],
  });

  res
    .status(200)
    .json({ status: 200, items: user, message: "successfully fetched user" });
};
