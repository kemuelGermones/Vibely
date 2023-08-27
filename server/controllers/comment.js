const { Comment, User, Avatar } = require("../models");

module.exports.getComments = async (req, res, next) => {
  const { postId } = req.params;
  const { page } = req.query;
  const limit = 10;
  const offset = page ? Number(page) * limit : 0;

  const comments = await Comment.findAll({
    limit,
    offset,
    where: { postId },
    order: [["createdAt", "ASC"]],
    include: [
      {
        model: User,
        as: "user",
        include: {
          model: Avatar,
          as: "avatar",
          attributes: { exclude: ["userId"] },
        },
      },
    ],
    exclude: ["userId", "postId"],
  });

  res.status(200).json({
    status: 200,
    items: comments,
    message: "successfully fetched comments",
  });
};

module.exports.createComment = async (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  await Comment.create({
    ...req.body,
    postId,
    userId: uid,
  });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully created a comment",
  });
};

module.exports.deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;

  await Comment.destroy({ where: { id: commentId, postId } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully deleted a comment",
  });
};
