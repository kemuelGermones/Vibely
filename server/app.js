require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT;

const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { authenticateSocket } = require("./middlewares/auth");
const sequelize = require("./configs/sequelize");
const clientRoute = require("./routes/client");
const userRoute = require("./routes/user");
const followRoute = require("./routes/follow");
const messageRoute = require("./routes/message");
const postRoute = require("./routes/post");
const postLikeRoute = require("./routes/postLike");
const commentRoute = require("./routes/comment");
const commentLikeRoute = require("./routes/commentLike");
const connectSocket = require("./socket");
const AppError = require("./utils/AppError");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_URL },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully!");
  })
  .catch((error) => {
    console.log("Unable to connect to the database", error);
  });

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully");
  })
  .catch((error) => {
    console.log("Cannot synchronize models successfully", error);
  });

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", clientRoute);
app.use("/users", userRoute);
app.use("/users/:userId/follows", followRoute);
app.use("/users/:userId/messages", messageRoute);
app.use("/posts", postRoute);
app.use("/posts/:postId/likes", postLikeRoute);
app.use("/posts/:postId/comments", commentRoute);
app.use("/posts/:postId/comments/:commentId/likes", commentLikeRoute);

app.all("*", (req, res, next) => {
  const appError = new AppError(400, "Not found");
  next(appError);
});

app.use((err, req, res, next) => {
  const {
    status = 500,
    message = "An error occured while trying your request",
  } = err;
  res.status(status).json({ status, message, items: null });
});

io.use(authenticateSocket);
io.on("connection", connectSocket(io));

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
