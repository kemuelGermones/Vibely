const { CommentLike } = require("../models");

module.exports.likeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { uid } = req.user;

  await CommentLike.create({ commentId, userId: uid });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully liked a comment",
  });
};

module.exports.unlikeComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { uid } = req.user;

  await CommentLike.destroy({ where: { commentId, userId: uid } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully unliked a comment",
  });
};
