const { User } = require("../models");
const AppError = require("../utils/AppError");
const { postSchema, commentSchema, signupSchema } = require("../schemas");

module.exports.validateCreatePost = (req, res, next) => {
  const { error } = postSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(",");
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
    const message = error.details.map((detail) => detail.message).join(",");
    throw new AppError(400, message);
  }

  next();
};

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(",");
    throw new AppError(400, message);
  }

  next();
};

module.exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    const message = error.details.map((detail) => detail.message).join(",");
    throw new AppError(400, message);
  }

  if (!req.file) {
    throw new AppError(400, '"avatar" is required');
  }

  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user) {
        throw new AppError(400, "user exist already");
      }

      next();
    })
    .catch((error) => {
      next(error);
    });
};
