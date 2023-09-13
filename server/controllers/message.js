const { Message, User, Avatar } = require("../models/index");
const { Op } = require("sequelize");

module.exports.getMessages = async (req, res, next) => {
  const { userId } = req.params;
  const { page } = req.query;
  const { uid } = req.user;
  const limit = 10;
  const offset = page ? Number(page) * limit : 0;

  const messages = await Message.findAll({
    limit,
    offset,
    where: {
      [Op.or]: [
        { senderId: uid, recieverId: userId },
        { senderId: userId, recieverId: uid },
      ],
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        as: "sender",
        include: {
          model: Avatar,
          as: "avatar",
          attributes: { exclude: ["userId"] },
        },
      },
      {
        model: User,
        as: "reciever",
        include: {
          model: Avatar,
          as: "avatar",
          attributes: { exclude: ["userId"] },
        },
      },
    ],
  });

  res.status(200).json({
    status: 200,
    items: messages,
    message: "successfully fetched messages",
  });
};

module.exports.createMessage = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  await Message.create({ ...req.body, senderId: uid, recieverId: userId });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully created a message",
  });
};
