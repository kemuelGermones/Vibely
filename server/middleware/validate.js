const {
  User,
  Post,
  Comment,
  Follow,
  PostLike,
  CommentLike,
} = require("../models");
const { postSchema, commentSchema, userSchema } = require("../schemas");
const AppError = require("../utils/AppError");

const OPTIONS = {
  errors: {
    wrap: {
      label: "",
    },
  },
};

module.exports.validatePostExistence = (req, res, next) => {
  const { postId } = req.params;

  Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (!post) {
        throw new AppError(400, "Post doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validatePostCaption = (req, res, next) => {
  const { error } = postSchema.validate(req.body, OPTIONS);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  next();
};

module.exports.validatePostImages = (req, res, next) => {
  if (req.files.length === 0) {
    throw new AppError(400, "Images is required");
  }

  next();
};

module.exports.validatePostOwner = (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  Post.findOne({ where: { id: postId } })
    .then((post) => {
      if (post.getDataValue("userId") !== uid) {
        throw new AppError(
          400,
          "You are not allowed to update/delete this post"
        );
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validatePostLikeAvailability = (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  PostLike.findOne({ where: { postId, userId: uid } })
    .then((like) => {
      if (like) {
        throw new AppError(400, "You already liked this post");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validatePostLikeExistence = (req, res, next) => {
  const { postId } = req.params;
  const { uid } = req.user;

  PostLike.findOne({ where: { postId, userId: uid } })
    .then((like) => {
      if (!like) {
        throw new AppError(400, "Post like doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateCommentExistence = (req, res, next) => {
  const { postId, commentId } = req.params;

  Comment.findOne({ where: { postId, id: commentId } })
    .then((comment) => {
      if (!comment) {
        throw new AppError(400, "Comment doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateCommentDescription = (req, res, next) => {
  const { error } = commentSchema.validate(req.body, OPTIONS);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  next();
};

module.exports.validateCommentOwner = (req, res, next) => {
  const { postId, commentId } = req.params;
  const { uid } = req.user;

  Comment.findOne({ where: { postId, id: commentId } })
    .then((comment) => {
      if (comment.getDataValue("userId") !== uid) {
        throw new AppError(400, "You are not allowed to delete this comment");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateCommentLikeAvailability = (req, res, next) => {
  const { commentId } = req.params;
  const { uid } = req.user;

  CommentLike.findOne({ where: { commentId, userId: uid } })
    .then((like) => {
      if (like) {
        throw new AppError(400, "You already liked this comment");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateCommentLikeExistence = (req, res, next) => {
  const { commentId } = req.params;
  const { uid } = req.user;

  CommentLike.findOne({ where: { commentId, userId: uid } })
    .then((like) => {
      if (!like) {
        throw new AppError(400, "Comment like doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateUserExistence = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        throw new AppError(400, "User doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateUserBody = (req, res, next) => {
  const { error } = userSchema.validate(req.body, OPTIONS);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  if (!req.file) {
    throw new AppError(400, "Avatar is required");
  }

  next();
};

module.exports.validateUsernameAvailability = (req, res, next) => {
  const { username } = req.body;

  User.findOne({
    where: { username },
  })
    .then((user) => {
      if (user) {
        throw new AppError(400, "Username has already been taken");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateEmailAvailability = (req, res, next) => {
  const { email } = req.body;

  User.findOne({
    where: { email },
  })
    .then((user) => {
      if (user) {
        throw new AppError(400, "Email has already been taken");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateFollowAvailability = (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  Follow.findOne({ where: { followerId: uid, followeeId: userId } })
    .then((follow) => {
      if (follow) {
        throw new AppError(400, "You already followed this user");
      }
      next();
    })
    .catch((error) => next(error));
};

module.exports.validateFollowExistence = (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  Follow.findOne({ where: { followerId: uid, followeeId: userId } })
    .then((follow) => {
      if (!follow) {
        throw new AppError(400, "Follow doesn't exist");
      }
      next();
    })
    .catch((error) => next(error));
};
