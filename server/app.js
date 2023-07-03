require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const sequelize = require("./config/sequelize");
const passportJwt = require("./config/passport");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const AppError = require("./utils/AppError");

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

app.use(express.json());

passport.use(passportJwt);
app.use(passport.initialize());

app.use("/", userRoute);
app.use("/posts", postRoute);
app.use("/posts/:postId/comments", commentRoute);

app.all("*", (req, res, next) => {
  next(new AppError("not found", 400));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong" } = err;
  res.status(status).json({ status, message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
