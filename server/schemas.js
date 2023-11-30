const escapeHtml = require("./configs/joi");

const Joi = require("joi").extend(escapeHtml);

module.exports.userSchema = Joi.object({
  firstname: Joi.string()
    .label("Firstname")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHtml()
    .required(),
  lastname: Joi.string()
    .label("Lastname")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHtml()
    .required(),
  username: Joi.string()
    .label("Username")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHtml()
    .required(),
  email: Joi.string().label("Email").email().escapeHtml().required(),
  password: Joi.string().label("Password").min(6).required(),
});

module.exports.postSchema = Joi.object({
  caption: Joi.string().label("Caption").escapeHtml().required(),
});

module.exports.commentSchema = Joi.object({
  description: Joi.string().label("Description").escapeHtml().required(),
});

module.exports.messageSchema = Joi.object({
  content: Joi.string().label("Content").escapeHtml().required(),
});
