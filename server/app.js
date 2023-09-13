require("dotenv").config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/sequelize");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const followRoute = require("./routes/follow");
const messageRoute = require("./routes/message");
const postRoute = require("./routes/post");
const postLikeRoute = require("./routes/postLike");
const commentRoute = require("./routes/comment");
const commentLikeRoute = require("./routes/commentLike");
const AppError = require("./utils/AppError");

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("connection has been established successfully!");
  })
  .catch((error) => {
    console.log("unable to connect to the database", error);
  });

sequelize
  .sync()
  .then(() => {
    console.log("all models were synchronized successfully");
  })
  .catch((error) => {
    console.log("cannot synchronize models successfully", error);
  });

app.use(cors());

app.use(express.json());

app.use("/", authRoute);
app.use("/users", userRoute);
app.use("/users/:userId/follows", followRoute);
app.use("/users/:userId/messages", messageRoute);
app.use("/posts", postRoute);
app.use("/posts/:postId/likes", postLikeRoute);
app.use("/posts/:postId/comments", commentRoute);
app.use("/posts/:postId/comments/:commentId/likes", commentLikeRoute);

app.all("*", (req, res, next) => {
  next(new AppError(400, "not found"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong" } = err;
  res.status(status).json({ status, items: null, message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
