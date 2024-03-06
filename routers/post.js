const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const { checkLogin } = require("../controller/user");
const {
  GetPost,
  PostPost,
  GetPostId,
  UpdatePost,
  DeletePost,
} = require("../controller/post");
const showError = require("../middleware/showError");
router.post(
  "/",
  query("title")
    .notEmpty()
    .withMessage("Không có tiêu đề")
    .isAlphanumeric()
    .withMessage("Tiêu đề khồn được chứa kí tự đặc biệt")
    .isLength({ min: 3 })
    .withMessage("Tiêu đề phải nhiều hơn 3 kí tự"),
  query("des")
    .notEmpty()
    .withMessage("Không có Mô tả")
    .isLength({ min: 5 })
    .withMessage("Mô tả phải nhiều hơn 5 kí tự"),
  showError,
  checkLogin,
  PostPost
);
router.put(
  "/:id",
  query("title")
    .notEmpty()
    .withMessage("Không có tiêu đề")
    .isAlphanumeric()
    .withMessage("Tiêu đề khồn được chứa kí tự đặc biệt")
    .isLength({ min: 3 })
    .withMessage("Tiêu đề phải nhiều hơn 3 kí tự"),
  query("des")
    .notEmpty()
    .withMessage("Không có Mô tả")
    .isLength({ min: 5 })
    .withMessage("Mô tả phải nhiều hơn 5 kí tự"),
  showError,
  checkLogin,
  UpdatePost
);
router.delete("/:id", checkLogin, DeletePost);

router.get("/:id", checkLogin, GetPostId);
router.get("/", checkLogin, GetPost);

module.exports = router;
