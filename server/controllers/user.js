const { User, Avatar } = require("../models");
const { Sequelize, Op } = require("sequelize");

module.exports.getUsers = async (req, res, next) => {
  const LIMIT = 10;

  const { page, search } = req.query;
  const offset = page ? Number(page) * LIMIT : 0;
  const where = search ? { username: { [Op.startsWith]: search } } : undefined;

  const users = await User.findAll({
    offset,
    where,
    limit: LIMIT,
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
    .json({ status: 200, items: users, message: "Successfully fetched users" });
};

module.exports.getContacts = async (req, res, next) => {
  const LIMIT = 10;

  const { page } = req.query;
  const { uid } = req.user;
  const offset = page ? Number(page) * LIMIT : 0;

  const users = await User.findAll({
    offset,
    limit: LIMIT,
    replacements: [uid, uid, uid, uid],
    where: {
      id: {
        [Op.in]: Sequelize.literal(
          "(SELECT receiverId AS userId FROM messages WHERE senderId = ? UNION SELECT senderId FROM messages WHERE receiverId = ?)"
        ),
      },
    },
    order: [
      [
        Sequelize.literal(
          "(SELECT createdAt FROM (SELECT * FROM messages WHERE (senderId = users.id AND receiverId = ?) OR (senderId = ? AND receiverId = users.id)) AS messages ORDER BY createdAt DESC LIMIT 1)"
        ),
        "DESC",
      ],
    ],
    include: [
      {
        model: Avatar,
        as: "avatar",
        attributes: { exclude: ["userId"] },
      },
    ],
  });

  res.status(200).json({
    status: 200,
    items: users,
    message: "Successfully fetched contacts",
  });
};

module.exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  const user = await User.findOne({
    where: { id: userId },
    replacements: [uid],
    include: [
      {
        model: Avatar,
        as: "avatar",
        attributes: { exclude: ["userId"] },
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM follows WHERE follows.followerId = users.id)"
          ),
          "following",
        ],
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM follows WHERE follows.followeeId = users.id)"
          ),
          "followers",
        ],
        [
          Sequelize.literal(
            "(SELECT EXISTS(SELECT * FROM follows WHERE follows.followerId = ? AND follows.followeeId = users.id))"
          ),
          "isFollowed",
        ],
      ],
    },
  });

  user.setDataValue("isFollowed", !!user.getDataValue("isFollowed"));

  res
    .status(200)
    .json({ status: 200, items: user, message: "Successfully fetched user" });
};
