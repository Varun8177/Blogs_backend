const { sequelize } = require("./models");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const blogRouter = require("./routes/blog.route");
const commentRouter = require("./routes/comment.route");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Backend for blogs",
  });
});

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("connected to db");
  });
});
