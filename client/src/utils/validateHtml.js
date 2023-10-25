import sanitizeHtml from "sanitize-html";

function validateHtml(text) {
  const sanitizedText = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return sanitizedText === text;
}

export default validateHtml;
