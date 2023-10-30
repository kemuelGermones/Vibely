const { Sequelize, Op } = require("sequelize");

const { User, Avatar } = require("../models");
const sequelize = require("../configs/sequelize");
const createUser = require("../utils/createUser");

module.exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const avatar = req.file;

  await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        firstname,
        lastname,
        username,
        email,
        avatar,
      },
      { include: [Avatar], transaction: t }
    );
    await createUser({
      email,
      password,
      displayName: username,
      photoURL: avatar.url,
      uid: user.id,
    });
  });

  res.status(200).json({
    status: 200,
    items: null,
    message: "Successfully created a user",
  });
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
