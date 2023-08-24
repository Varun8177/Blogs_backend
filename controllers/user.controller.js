const { users } = require("../models");
var { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const data = await users.findAll();
    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

const validateUser = async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  try {
    const data = await users.findOne({ where: { id: decoded.id } });
    if (data) {
      res.status(200).send({
        user: data,
      });
    } else {
      res.status(404).send({
        message: "no user found",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await users.findOne({
      where: {
        email,
      },
    });
    if (user) {
      res.status(400).send({
        error: "user already exist",
      });
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const data = await users.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(200).send({
        data,
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).send({
        error: "user not found, please register",
      });
    } else {
      const passwordCheck = await compare(password, user.password);
      if (passwordCheck) {
        const token = jwt.sign({ id: user.id }, "zoro");
        res.status(200).send({
          user,
          token,
        });
      } else {
        res.status(400).send({
          error: "wrong credentials",
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

module.exports = { getUsers, validateUser, register, login };
