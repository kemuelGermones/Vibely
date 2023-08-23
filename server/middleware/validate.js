const { User } = require("../models");
const { postSchema, commentSchema, signupSchema } = require("../schemas");
const AppError = require("../utils/AppError");

module.exports.validateCreatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  if (req.files.length === 0) {
    throw new AppError(400, '"images" is required');
  }

  next();
};

module.exports.validateUpdatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  next();
};

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  next();
};

module.exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    throw new AppError(400, message);
  }

  if (!req.file) {
    throw new AppError(400, '"avatar" is required');
  }

  User.findOne({
    where: { username: req.body.username },
  })
    .then((user) => {
      if (user) {
        throw new AppError(400, '"username" has already been taken');
      }
    })
    .catch((error) => {
      next(error);
    });

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        throw new AppError(400, "user exist already");
      }
    })
    .catch((error) => {
      next(error);
    });

  next();
};

module.exports.validateFollowUser = (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  if (userId === uid) {
    throw new AppError(400, "you are not allowed to follow this user");
  }

  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        throw new AppError(400, "user does not exist");
      }
      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.validateUnfollowUser = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        throw new AppError(400, "user does not exist");
      }
      next();
    })
    .catch((error) => {
      next(error);
    });
};
