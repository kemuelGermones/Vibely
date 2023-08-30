const { Sequelize } = require("sequelize");
const { Comment, CommentLike, User, Avatar } = require("../models");

module.exports.getComments = async (req, res, next) => {
  const { postId } = req.params;
  const { page } = req.query;
  const { uid } = req.user;
  const limit = 10;
  const offset = page ? Number(page) * limit : 0;

  const comments = await Comment.findAll({
    limit,
    offset,
    where: { postId },
    replacements: [uid],
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
    attributes: {
      include: [
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM commentLikes WHERE commentLikes.commentId = comments.id)"
          ),
          "likes",
        ],
        [
          Sequelize.literal(
            "(SELECT EXISTS(SELECT * FROM commentLikes WHERE commentLikes.userId = ? AND commentLikes.commentId = comments.id))"
          ),
          "isLiked",
        ],
      ],
      exclude: ["userId", "postId"],
    },
  });

  comments.forEach((comment) =>
    comment.setDataValue("isLiked", !!comment.getDataValue("isLiked"))
  );

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
