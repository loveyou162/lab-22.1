const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/lab21", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const productDb = new Schema({
  userId: String,
  title: String,
  description: String,
  imgUrl: String,
  date: Date,
});
module.exports = mongoose.model("listPost", productDb);
