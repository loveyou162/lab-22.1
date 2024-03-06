const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/lab21", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userDB = new Schema({
  email: String,
  password: String,
});
module.exports = mongoose.model("user", userDB);
