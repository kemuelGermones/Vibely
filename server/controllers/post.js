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
  const post = await Post.create(
    {
      ...req.body,
      images: req.files,
      userId: req.user.uid,
    },
    { include: [Image] }
  );

  const foundPost = await Post.findOne({
    where: { id: post.id },
    ...OPTIONS,
  });

  res.status(200).json(foundPost);
};

module.exports.updatePost = async (req, res) => {
  const { postId } = req.params;

  const post = await sequelize.transaction(async (t) => {
    const destroyImagesDb = req.body.images.map(
      async (image) =>
        await Image.destroy({
          where: { filename: image.filename, postId },
          transaction: t,
        })
    );

    await Promise.all(destroyImagesDb);

    await Post.update(
      { caption: req.body.caption },
      { where: { id: postId }, transaction: t }
    );

    const foundPost = await Post.findOne({
      where: { id: postId },
      transaction: t,
      ...OPTIONS,
    });

    return foundPost;
  });

  const destroyImagesCloudinary = req.body.images.map(async (image) => {
    await cloudinary.uploader.destroy(image.filename);
  });

  await Promise.all(destroyImagesCloudinary);

  res.status(200).json(post);
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

  res.status(200).json({ status: 200, message: "successfully deleted a post" });
};
