const User = require("../data/userDb");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.Login = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;

  User.find({ email: email })
    .then((data) => {
      if (data.length) {
        bcrypt.compare(password, data[0].password, function (err, result) {
          if (err) {
            return res.status(500).json({ err: "err", message: err.message });
          }
          if (result) {
            req.session.user = data[0];

            return res.send(JSON.stringify("ok"));
          } else {
            req.flash("error", "invalid email or password!");
            return res.send(req.flash("error"));
          }
        });
      } else {
        req.flash("error", "invalid email or password!");
        return res.send(req.flash("error"));
      }
    })
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.LogOut = (req, res, next) => {
  req.session.destroy(() => {
    res.send("Logut");
  });
};
exports.SignUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((data) => {
      if (data.length) {
        return res.send({ err: "error", message: ["Email đã dùng"] });
      } else if (req.body.password !== req.body.confirmpassword) {
        return res.send({
          err: "error",
          message: ["Mật khẩu xác nhận không đúng"],
        });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            return console.log(err);
          } else {
            return User.create({
              email: req.body.email,
              password: hash,
            })
              .then(() => {
                res.send(JSON.stringify("ok"));
              })
              .catch((err) => {
                res.status(500).json({ err: "err", message: err.message });
              });
          }
        });
      }
    })
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.checkLogin = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
    next();
  } else res.send(JSON.stringify("noLogin"));
};
exports.isLogin = (req, res, next) => {
  User.findById(req.user._id.toString())
    .then((data) => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        res.status(500).json({ err: "err", message: "chưa đăng nhập" });
      }
    })
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
