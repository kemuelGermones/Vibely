const { DataTypes } = require("sequelize");

const sequelize = require("../configs/sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2,
        max: 30,
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2,
        max: 30,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
        min: 2,
        max: 30,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    updatedAt: false,
  }
);

const Avatar = sequelize.define(
  "avatars",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

const Image = sequelize.define(
  "images",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

const Message = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { updatedAt: false }
);

const Follow = sequelize.define("follows", {}, { updatedAt: false });

const PostLike = sequelize.define("postLikes", {}, { updatedAt: false });

const CommentLike = sequelize.define("commentLikes", {}, { updatedAt: false });

User.hasOne(Avatar, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Avatar.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

User.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

User.hasMany(Comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Post.hasMany(Image, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Image.belongsTo(Post, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Comment.belongsTo(Post, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

User.hasMany(Message, {
  foreignKey: { name: "senderId", allowNull: false },
  as: "sent",
  onDelete: "CASCADE",
});
Message.belongsTo(User, {
  foreignKey: { name: "senderId", allowNull: false },
  as: "sender",
  onDelete: "CASCADE",
});

User.hasMany(Message, {
  foreignKey: { name: "receiverId", allowNull: false },
  as: "received",
  onDelete: "CASCADE",
});
Message.belongsTo(User, {
  foreignKey: { name: "receiverId", allowNull: false },
  as: "receiver",
  onDelete: "CASCADE",
});

User.belongsToMany(User, {
  foreignKey: "followerId",
  as: "followee",
  through: Follow,
});
User.belongsToMany(User, {
  foreignKey: "followeeId",
  as: "follower",
  through: Follow,
});

Post.belongsToMany(User, {
  foreignKey: "postId",
  through: PostLike,
});
User.belongsToMany(Post, {
  foreignKey: "userId",
  through: PostLike,
});

Comment.belongsToMany(User, {
  foreignKey: "commentId",
  through: CommentLike,
});
User.belongsToMany(Comment, {
  foreignKey: "userId",
  through: CommentLike,
});

module.exports = {
  User,
  Avatar,
  Post,
  Image,
  Comment,
  Message,
  Follow,
  PostLike,
  CommentLike,
};
