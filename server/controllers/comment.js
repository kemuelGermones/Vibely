const { Comment, User, Avatar } = require("../models");

const OPTIONS = {
  include: [
    {
      model: User,
      as: "user",
      attributes: { exclude: ["password", "email"] },
      include: {
        model: Avatar,
        as: "avatar",
        attributes: { exclude: ["userId"] },
      },
    },
  ],
  exclude: ["userId", "postId"],
};

module.exports.getComments = async (req, res, next) => {
  const { postId } = req.params;
  const comments = await Comment.findAll({ where: { postId }, ...OPTIONS });
  res.status(200).json(comments);
};

module.exports.createComment = async (req, res, next) => {
  const { postId } = req.params;
  const { id } = await Comment.create({
    ...req.body,
    postId,
    userId: req.user.id,
  });
  const comment = await Comment.findOne({ where: { id }, ...OPTIONS });
  res.status(200).json(comment);
};

module.exports.deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;
  await Comment.destroy({ where: { id: commentId, postId } });
  res
    .status(200)
    .json({ status: 200, message: "successfully deleted a comment" });
};
