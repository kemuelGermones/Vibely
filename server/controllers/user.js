const { User, Avatar, Follow } = require("../models");
const { Op } = require("sequelize");

module.exports.getUsers = async (req, res, next) => {
  const limit = 10;
  const { page, search } = req.query;
  const offset = page ? Number(page) * limit : 0;
  const where = search ? { username: { [Op.startsWith]: search } } : undefined;

  const users = await User.findAll({
    limit,
    offset,
    where,
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
    .json({ status: 200, items: users, message: "successfully fetched users" });
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

module.exports.followUser = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  await Follow.create({ follower_id: uid, followee_id: userId });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully followed a user",
  });
};

module.exports.unfollowUser = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  await Follow.destroy({ where: { follower_id: uid, followee_id: userId } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully unfollowed a user",
  });
};
