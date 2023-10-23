const { User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const createUser = require("../utils/createUser");

module.exports.signup = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const avatar = req.file;

  await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        firstname,
        lastname,
        username,
        email,
        avatar,
      },
      { include: [Avatar], transaction: t }
    );
    await createUser({
      email,
      password,
      displayName: username,
      photoURL: avatar.url,
      uid: user.id,
    });
  });

  res.status(200).json({
    status: 200,
    items: null,
    message: "Successfully created a user",
  });
};
