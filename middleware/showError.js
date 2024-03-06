const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const error = validationResult(req);
  if (error.array().length) {
    const errors = error.array().map((err) => err.msg);
    const listError = error.array().map((err) => err.path);
    console.log(listError);
    res.send({ err: "error", list: listError, message: errors });
  } else {
    next();
  }
};
