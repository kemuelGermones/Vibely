const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

// Adds a escapeHTML method to Joi and checks if the
// incoming data contains HTML elements
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) {
          return helpers.error("string.escapeHTML", { value });
        }
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.postSchema = Joi.object({
  caption: Joi.string().escapeHTML().required(),
});

module.exports.commentSchema = Joi.object({
  description: Joi.string().escapeHTML().required(),
});

module.exports.signupSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  username: Joi.string()
    .min(2)
    .max(30)
    .regex(/^[a-z]+$/i)
    .escapeHTML()
    .required(),
  email: Joi.string().email().escapeHTML().required(),
  password: Joi.string().min(6).escapeHTML().required(),
});
