const { Post, Image, User, Avatar } = require("../models");
const { Sequelize } = require("sequelize");
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

module.exports.getUserPosts = async (req, res, next) => {
  const { userId } = req.params;
  const { page } = req.query;

  const limit = 10;
  const offset = page ? Number(page) * limit : 0;

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(400, "user does not exist");
  }

  const posts = await Post.findAll({
    limit,
    offset,
    where: { userId },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Image,
        as: "images",
        attributes: { exclude: ["postId"] },
      },
      {
        model: User,
        as: "user",
        include: {
          model: Avatar,
          as: "avatar",
          attributes: { exclude: ["userId"] },
        },
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM comments WHERE comments.postId = posts.id )"
          ),
          "comments",
        ],
      ],
      exclude: ["userId"],
    },
  });

  res.status(200).json({
    status: 200,
    items: posts,
    message: "successfully fetched posts",
  });
};
