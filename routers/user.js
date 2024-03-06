const express = require("express");
const router = express.Router();
const {
  SignUp,
  Login,
  LogOut,
  checkLogin,
  isLogin,
} = require("../controller/user");
const { body, query } = require("express-validator");
const showError = require("../middleware/showError");
router.post(
  "/signup",
  body("email")
    .notEmpty()
    .withMessage("không có email")
    .isEmail()
    .withMessage("không đúng định dạng email"),
  body("password")
    .notEmpty()
    .withMessage("không có password")
    .isLength({ min: 8 })
    .withMessage("mật khẩu phải lớn hơn 8 kí tự"),
  showError,
  SignUp
);
router.get(
  "/login",
  query("email")
    .notEmpty()
    .withMessage("Email không được bỏ trống")
    .isEmail()
    .withMessage("không đúng định dạng email"),
  query("password").notEmpty().withMessage("Email không được bỏ trống"),
  showError,
  Login
);
router.get("/logout", LogOut);
router.get("/checklogin", checkLogin, isLogin);

module.exports = router;
