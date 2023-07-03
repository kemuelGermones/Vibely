// Wrapper function that
// executes the async function and catch any errors
const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => next(error));
  };
};

module.exports = wrapAsync;
