const { Comment, User, Avatar } = require("../models");

const OPTIONS = {
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
};

module.exports.getComments = async (req, res, next) => {
  const { postId } = req.params;

  const comments = await Comment.findAll({ where: { postId }, ...OPTIONS });

  res.status(200).json({
    status: 200,
    data: comments,
    message: "successfully fetched comments",
  });
};

module.exports.createComment = async (req, res, next) => {
  const { postId } = req.params;

  const comment = await Comment.create({
    ...req.body,
    postId,
    userId: req.user.uid,
  });

  const foundComment = await Comment.findOne({
    where: { id: comment.id },
    ...OPTIONS,
  });

  res.status(200).json({
    status: 200,
    data: foundComment,
    message: "successfully created a comment",
  });
};

module.exports.deleteComment = async (req, res, next) => {
  const { postId, commentId } = req.params;

  await Comment.destroy({ where: { id: commentId, postId } });

  res.status(200).json({
    status: 200,
    data: null,
    message: "successfully deleted a comment",
  });
};
