const { Sequelize } = require("sequelize");
const { Post, Image, Comment, User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const cloudinary = require("../config/cloudinary");

module.exports.getPosts = async (req, res) => {
  const { user, page } = req.query;
  const limit = 10;
  const where = user ? { userId: user } : undefined;
  const offset = page ? Number(page) * limit : 0;

  const posts = await Post.findAll({
    where,
    limit,
    offset,
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

module.exports.createPost = async (req, res) => {
  await Post.create(
    {
      ...req.body,
      images: req.files,
      userId: req.user.uid,
    },
    { include: [Image] }
  );

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully created a post",
  });
};

module.exports.updatePost = async (req, res) => {
  const { postId } = req.params;

  await Post.update({ caption: req.body.caption }, { where: { id: postId } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully updated a post",
  });
};

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  const images = await Image.findAll({ where: { postId } });

  await sequelize.transaction(async (t) => {
    await Comment.destroy({ where: { postId }, transaction: t });
    await Image.destroy({ where: { postId }, transaction: t });
    await Post.destroy({ where: { id: postId }, transaction: t });
  });

  const destroyImagesCloudinary = images.map(async (image) => {
    await cloudinary.uploader.destroy(image.filename);
  });

  await Promise.all(destroyImagesCloudinary);

  res.status(200).json({
    status: 200,
    items: null,
    message: "successfully deleted a post",
  });
};
