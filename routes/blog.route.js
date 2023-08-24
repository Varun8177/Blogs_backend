const express = require("express");
const { blogs, comments } = require("../models");
const auth = require("../middleware/Auth");
const blogRouter = express.Router();

blogRouter.get("/personal", auth, async (req, res) => {
  const userId = req.body.userId;
  try {
    const data = await blogs.findAll({ where: { userId } });
    res.status(200).send({
      isError: false,
      blogs: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

blogRouter.get("/", async (req, res) => {
  const query = req.query;
  const categoryQuery = {};
  if (query.category) {
    categoryQuery["category"] = query.category;
  }
  console.log(categoryQuery);
  try {
    const data = await blogs.findAll({ where: categoryQuery });
    res.status(200).send({
      blogs: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

blogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blogs.findOne({ where: { id } });
    res.status(200).send({
      blog: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

blogRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await comments.destroy({ where: { blogId: id } });
    const data = await blogs.destroy({ where: { id } });
    res.status(200).send({
      blog: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

blogRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await blogs.update(req.body, { where: { id } });
    res.status(200).send({
      blog: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

blogRouter.post("/", auth, async (req, res) => {
  const { title, description, blogImg, category, userId, username, useremail } =
    req.body;
  console.log({ userId });
  try {
    const data = await blogs.create({
      title,
      description,
      blogImg,
      category,
      userId,
      username,
      useremail,
    });
    res.status(200).send({
      blogs: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

module.exports = blogRouter;
