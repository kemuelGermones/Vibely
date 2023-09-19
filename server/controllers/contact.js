const { User, Avatar } = require("../models");
const { Sequelize, Op } = require("sequelize");

module.exports.getContacts = async (req, res, next) => {
  const { page } = req.query;
  const { uid } = req.user;
  const limit = 10;
  const offset = page ? Number(page) * limit : 0;

  const users = await User.findAll({
    limit,
    offset,
    replacements: [uid, uid, uid, uid],
    where: {
      id: {
        [Op.in]: Sequelize.literal(
          "(SELECT recieverId AS userId FROM messages WHERE senderId = ? UNION SELECT senderId FROM messages WHERE recieverId = ?)"
        ),
      },
    },
    order: [
      [
        Sequelize.literal(
          "(SELECT createdAt FROM (SELECT * FROM messages WHERE (senderId = users.id AND recieverId = ?) OR (senderId = ? AND recieverId = users.id)) AS messages ORDER BY createdAt DESC LIMIT 1)"
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
    message: "successfully fetched contacts",
  });
};
