const AppError = require("../utils/AppError");
const {
  createPostSchema,
  updatePostSchema,
  commentSchema,
  signupSchema,
} = require("../schemas");

module.exports.validateCreatePost = (req, res, next) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new AppError(msg, 400);
  }

  next();
};

module.exports.validateUpdatePost = (req, res, next) => {
  const { error } = updatePostSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new AppError(msg, 400);
  }

  next();
};

module.exports.validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new AppError(msg, 400);
  }

  next();
};

module.exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((detail) => detail.message).join(",");
    throw new AppError(msg, 400);
  }

  next();
};

module.exports.validateAvatar = (req, res, next) => {
  if (!req.file) {
    throw new AppError("avatar is required", 400);
  }

  next();
};
