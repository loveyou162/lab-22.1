const { getDb } = require("../data/database");
const mongodb = require("mongodb");
class Order {
  constructor(order, total, userId) {
    this.order = order;
    this.total = total;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    return db
      .collection("orders")
      .insertOne(this)
      .then(() => {
        db.collection("users").updateOne(
          {
            _id: new mongodb.ObjectId(this.userId),
          },
          { $set: { cart: [] } }
        );
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("orders")
      .find()
      .toArray()
      .then((order) => order)
      .catch((err) => console.log(err));
  }
}
module.exports = Order;
