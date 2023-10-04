const { Sequelize } = require("sequelize");
const { Post, Image, User, Avatar } = require("../models");
const cloudinary = require("../config/cloudinary");
const sequelize = require("../config/sequelize");

module.exports.getPosts = async (req, res) => {
  const LIMIT = 10;

  const { page, search } = req.query;
  const { uid } = req.user;
  const offset = page ? Number(page) * LIMIT : 0;
  const where = search ? { userId: search } : undefined;

  const posts = await Post.findAll({
    offset,
    where,
    limit: LIMIT,
    replacements: [uid],
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
        [
          Sequelize.literal(
            "(SELECT COUNT(*) FROM postLikes WHERE postLikes.postId = posts.id)"
          ),
          "likes",
        ],
        [
          Sequelize.literal(
            "(SELECT EXISTS(SELECT * FROM postLikes WHERE postLikes.userId = ? AND postLikes.postId = posts.id))"
          ),
          "isLiked",
        ],
      ],
      exclude: ["userId"],
    },
  });

  posts.forEach((post) =>
    post.setDataValue("isLiked", !!post.getDataValue("isLiked"))
  );

  res.status(200).json({
    status: 200,
    items: posts,
    message: "Successfully fetched posts",
  });
};

module.exports.createPost = async (req, res) => {
  const { uid } = req.user;
  const images = req.files;

  await Post.create(
    {
      ...req.body,
      images,
      userId: uid,
    },
    { include: [Image] }
  );

  res.status(200).json({
    status: 200,
    items: null,
    message: "Successfully created a post",
  });
};

module.exports.updatePost = async (req, res) => {
  const { postId } = req.params;

  await Post.update(req.body, { where: { id: postId } });

  res.status(200).json({
    status: 200,
    items: null,
    message: "Successfully updated a post",
  });
};

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  const images = await Image.findAll({ where: { postId } });

  const destroyImagesCloudinary = images.map(async (image) => {
    await cloudinary.uploader.destroy(image.getDataValue("filename"));
  });

  await sequelize.transaction(async (t) => {
    await Post.destroy({ where: { id: postId }, transaction: t });
    await Promise.all(destroyImagesCloudinary);
  });

  res.status(200).json({
    status: 200,
    items: null,
    message: "Successfully deleted a post",
  });
};
