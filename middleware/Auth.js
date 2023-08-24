const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  if (decoded.id) {
    req.body.userId = decoded.id;
    next();
  } else {
    res.status(400).send({
      error: "not authorized",
    });
  }
};

module.exports = auth;
