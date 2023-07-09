const { Post, Comment } = require("../models");
const AppError = require("../utils/AppError");

module.exports.isPostOwner = (req, res, next) => {
  const { postId } = req.params;

  Post.findOne({ where: { id: postId } })
    .then((comment) => {
      if (!comment) {
        throw new AppError("comment doesn't exists", 400);
      }

      if (comment.userId !== req.user.id) {
        throw new AppError(
          "you are not allowed to update/delete this comment",
          400
        );
      }

      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.isCommentOwner = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findOne({ where: { id: commentId } })
    .then((comment) => {
      if (!comment) {
        throw new AppError("comment doesn't exists", 400);
      }

      if (comment.userId !== req.user.id) {
        throw new AppError(
          "you are not allowed to update/delete this comment",
          400
        );
      }

      next();
    })
    .catch((error) => {
      next(error);
    });
};
