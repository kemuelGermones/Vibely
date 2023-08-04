const { Comment, User, Avatar } = require("../models");

module.exports.getComments = async (req, res, next) => {
  const { postId } = req.params;
  const page = req.query.page ? Number(req.query.page) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const offset = page * limit;

  const comments = await Comment.findAll({
    where: { postId },
    order: [["createdAt", "ASC"]],
    limit,
    offset,
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

  await Comment.create({
    ...req.body,
    postId,
    userId: req.user.uid,
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
