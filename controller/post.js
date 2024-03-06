const ListPostDB = require("../data/PostDB");
const fileHelper = require("../util/file");

exports.GetPost = (req, res, next) => {
  const userId = req.session.user._id.toString();
  ListPostDB.find({})
    .then((data) => res.send(data.filter((data) => data.userId === userId)))
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.GetPostId = (req, res, next) => {
  ListPostDB.findById(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.PostPost = (req, res, next) => {
  const userId = req.session.user._id.toString();
  const body = req.query;

  ListPostDB.create({
    userId: userId,
    title: body.title,
    description: body.des,
    date: body.date,
    imgUrl: req.files[0].path,
  })
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((data) => res.send(JSON.stringify("Thêm sản phẩm thành công!")))
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.UpdatePost = (req, res, next) => {
  console.log(req.query);
  console.log(req.params);

  if (!req.files.length) {
    return res.send({ err: "err", message: "chưa có ảnh" });
  }
  ListPostDB.updateOne(
    { _id: req.params.id },
    {
      title: req.query.title,
      description: req.query.des,
      imgUrl: req.files[0].path,
    }
  )
    .then((r) => res.send(JSON.stringify("update successfully!")))
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
exports.DeletePost = (req, res, next) => {
  ListPostDB.findById({ _id: req.params.id })
    .then((product) => {
      console.log(84, product);
      fileHelper.deleteFile(product.imgUrl);
      return Posts.deleteOne({ _id: postId });
    })
    .then(() => {
      console.log("Destroy product");
    })
    .catch((err) => res.status(500).json({ err: "err", message: err.message }));
};
