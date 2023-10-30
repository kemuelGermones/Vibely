const { Op } = require("sequelize");

const { Message } = require("../models/index");

module.exports.getMessages = async (req, res, next) => {
  const LIMIT = 10;

  const { userId } = req.params;
  const { page } = req.query;
  const { uid } = req.user;
  const offset = page ? Number(page) * LIMIT : 0;

  const messages = await Message.findAll({
    offset,
    limit: LIMIT,
    where: {
      [Op.or]: [
        { senderId: uid, receiverId: userId },
        { senderId: userId, receiverId: uid },
      ],
    },
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    status: 200,
    items: messages,
    message: "Successfully fetched messages",
  });
};
