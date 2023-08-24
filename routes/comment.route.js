const express = require("express");
const { comments } = require("../models");
const commentRouter = express.Router();

commentRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await comments.findAll({ where: { blogId: id } });
    res.status(200).send({
      comments: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

commentRouter.post("/", async (req, res) => {
  const { text, blogId, username } = req.body;
  try {
    const data = await comments.create({ text, blogId, username });
    res.status(200).send({
      comment: data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

module.exports = commentRouter;
