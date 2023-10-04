const admin = require("../config/firebase");
const AppError = require("../utils/AppError");

module.exports.authenticateRoute = (req, res, next) => {
  const PATTERN = /^Bearer\s[^\s]/;
  
  const bearerToken = req.headers.authorization;

  if (!PATTERN.test(bearerToken)) {
    throw new AppError(400, "Invalid bearer token");
  }

  const token = bearerToken.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => next(new AppError(400, error.message)));
};

module.exports.authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!(typeof token === "string")) {
    return next(new Error("Invalid token"));
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      socket.user = user;
      next();
    })
    .catch((error) => next(error));
};
