const { User, Avatar } = require("../models");
const AppError = require("../utils/AppError");

module.exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({
    where: { id: userId },
    include: [
      {
        model: Avatar,
        as: "avatar",
        attributes: { exclude: ["userId"] },
      },
    ],
  });

  if (!user) {
    throw new AppError(400, "user does not exist");
  }

  res
    .status(200)
    .json({ status: 200, items: user, message: "successfully fetched user" });
};
