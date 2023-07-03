const bcrypt = require("bcryptjs");

module.exports.hashPassword = (req, res, next) => {
  const { password } = req.body;
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => {
      req.body.password = hash;
      next();
    })
    .catch((error) => {
      next(error);
    });
};
