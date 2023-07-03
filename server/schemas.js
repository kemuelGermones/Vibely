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
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.createPostSchema = Joi.object({
  caption: Joi.string().escapeHTML().required(),
});

module.exports.updatePostSchema = Joi.object({
  caption: Joi.string().escapeHTML().required(),
  images: Joi.array()
    .items(
      Joi.object({
        id: Joi.string()
          .guid({ version: ["uuidv4"] })
          .required(),
        url: Joi.string().uri().required(),
        filename: Joi.string().escapeHTML().required(),
      })
    )
    .required(),
});

module.exports.commentSchema = Joi.object({
  description: Joi.string().escapeHTML().required(),
});

module.exports.signupSchema = Joi.object({
  firstname: Joi.string().escapeHTML().required(),
  lastname: Joi.string().escapeHTML().required(),
  username: Joi.string().escapeHTML().required(),
  email: Joi.string().email().escapeHTML().required(),
  password: Joi.string().escapeHTML().required(),
});

module.exports.signinSchema = Joi.object({
  email: Joi.string().email().escapeHTML().required(),
  password: Joi.string().escapeHTML().required(),
});
