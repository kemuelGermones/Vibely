const { Sequelize } = require("sequelize");
const { Post, Image, Comment, User, Avatar } = require("../models");
const sequelize = require("../config/sequelize");
const cloudinary = require("../config/cloudinary");

const OPTIONS = {
  include: [
    {
      model: Image,
      as: "images",
      attributes: { exclude: ["postId"] },
    },
    {
      model: User,
      as: "user",
      attributes: { exclude: ["password", "email"] },
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
};

module.exports.getPosts = async (req, res) => {
  const posts = await Post.findAll(OPTIONS);
  res.status(200).json(posts);
};

module.exports.createPost = async (req, res) => {
  const { id } = await Post.create(
    {
      ...req.body,
      images: req.files,
      userId: req.user.id,
    },
    { include: [Image] }
  );
  const post = await Post.findOne({
    where: { id },
    ...OPTIONS,
  });
  res.status(200).json(post);
};

module.exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  const { caption, images } = req.body;
  const post = await sequelize.transaction(async () => {
    const destroyImagesDb = images.map(
      async (image) =>
        await Image.destroy({ where: { filename: image.filename, postId } })
    );
    await Promise.all(destroyImagesDb);
    await Post.update({ caption }, { where: { id: postId } });
    return await Post.findOne({
      where: { id: postId },
      ...OPTIONS,
    });
  });
  const destroyImagesCloudinary = images.map(async (image) => {
    await cloudinary.uploader.destroy(image.filename);
  });
  await Promise.all(destroyImagesCloudinary);
  res.status(200).json(post);
};

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const images = await Image.findAll({ where: { postId } });
  await sequelize.transaction(async () => {
    await Comment.destroy({ where: { postId } });
    await Image.destroy({ where: { postId } });
    await Post.destroy({ where: { id: postId } });
  });
  const destroyImagesCloudinary = images.map(async (image) => {
    await cloudinary.uploader.destroy(image.filename);
  });
  await Promise.all(destroyImagesCloudinary);
  res.status(200).json({ status: 200, message: "successfully deleted a post" });
};