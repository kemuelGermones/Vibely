const admin = require("../config/firebase");
const AppError = require("../utils/AppError");

module.exports.authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError(400, "bearer token is required");
  }

  if (!/^Bearer\s[^\s]/.test(bearerToken)) {
    throw new AppError(400, "invalid bearer token");
  }

  const token = bearerToken.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      const auth = error.code.split("/")[1];
      const code = auth.replace(/-/g, " ");
      next(new AppError(400, code));
    });
};
