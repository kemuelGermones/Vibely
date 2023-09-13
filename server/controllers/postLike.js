const { PostLike } = require("../models");

module.exports.likePost = async (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  await PostLike.create({ postId, userId: uid });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully liked a post",
  });
};

module.exports.unlikePost = async (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  await PostLike.destroy({ where: { postId, userId: uid } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully unliked a post",
  });
};
