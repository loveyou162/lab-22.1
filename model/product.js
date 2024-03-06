const { getDb } = require("../data/database");
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imgUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      return db
        .collection("products")
        .insertOne(this)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  }
  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => console.log(err));
  }
  static fetchById(id) {
    const db = getDb();

    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
  static deleteById(id) {
    const db = getDb();

    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then(() => {
        console.log("delete!");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
