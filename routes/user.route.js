const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  validateUser,
  register,
  login,
} = require("../controllers/user.controller");

// get all users

userRouter.get("/", getUsers);

// get a single user using token
userRouter.get("/validate", validateUser);

// register a new user
userRouter.post("/register", register);

// login a already registered user
userRouter.post("/login", login);

module.exports = userRouter;
