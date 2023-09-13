const { Follow } = require("../models");

module.exports.followUser = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  await Follow.create({ followerId: uid, followeeId: userId });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully followed a user",
  });
};

module.exports.unfollowUser = async (req, res, next) => {
  const { userId } = req.params;
  const { uid } = req.user;

  await Follow.destroy({ where: { followerId: uid, followeeId: userId } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully unfollowed a user",
  });
};
