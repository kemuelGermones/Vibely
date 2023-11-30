const sanitizeHtml = require("sanitize-html");

// Adds a escapeHtml method to Joi and checks if the
// incoming data contains HTML elements
const escapeHtml = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHtml": "{{#label}} must not include HTML",
  },
  rules: {
    escapeHtml: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) {
          return helpers.error("string.escapeHtml", { value });
        }
        return clean;
      },
    },
  },
});

module.exports = escapeHtml;
