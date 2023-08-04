const admin = require("../config/firebase");
const { Post, Comment } = require("../models");
const AppError = require("../utils/AppError");

module.exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      const auth = error.code.split("/")[1];
      const code = auth.replace(/-/g, " ");
      next(new AppError(400, code));
    });
};

module.exports.isPostOwner = (req, res, next) => {
  const { postId } = req.params;

  Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        throw new AppError(400, "post doesn't exist");
      }
      if (post.userId !== req.user.uid) {
        throw new AppError(
          400,
          "you are not allowed to update/delete this post"
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
        throw new AppError(400, "comment doesn't exist");
      }
      if (comment.userId !== req.user.uid) {
        throw new AppError(400, "you are not allowed to delete this comment");
      }
      next();
    })
    .catch((error) => {
      next(error);
    });
};
