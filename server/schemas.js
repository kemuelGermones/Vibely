const escapeHTML = require("./utils/escapeHTML");
const Joi = require("joi").extend(escapeHTML);

module.exports.userSchema = Joi.object({
  firstname: Joi.string()
    .label("Firstname")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  lastname: Joi.string()
    .label("Lastname")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  username: Joi.string()
    .label("Username")
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  email: Joi.string().label("Email").email().escapeHTML().required(),
  password: Joi.string().label("Password").min(6).required(),
});

module.exports.postSchema = Joi.object({
  caption: Joi.string().label("Caption").escapeHTML().required(),
});

module.exports.commentSchema = Joi.object({
  description: Joi.string().label("Description").escapeHTML().required(),
});

module.exports.messageSchema = Joi.object({
  content: Joi.string().label("Content").escapeHTML().required(),
});
