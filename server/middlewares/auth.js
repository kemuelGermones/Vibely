const admin = require("../configs/firebase");
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
    .catch((error) => {
      const { code } = error;
      const info = code.split("/")[1];
      const char = info.charAt(0).toUpperCase();
      const message = char.concat(info.slice(1)).replace(/-/g, " ");
      next(new AppError(400, message));
    });
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
    .catch((error) => {
      const { code } = error;
      const info = code.split("/")[1];
      const char = info.charAt(0).toUpperCase();
      const message = char.concat(info.slice(1)).replace(/-/g, " ");
      next(new Error(message));
    });
};
