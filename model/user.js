const { getDb } = require("../data/database");
const mongodb = require("mongodb");
class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  static addCart(productId, userId) {
    console.log(userId, productId);
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: userId })
      .toArray()
      .then((products) => {
        let cart = products[0].cart;
        // khi ko có sản phẩm nào trùng
        if (!cart.find((cart) => cart.productId === productId)) {
          cart = [...cart, { productId: productId, quantity: 1 }];
        } else {
          // nếu có thì thêm quantity lên1
          for (let x = 0; x < cart.length; x++) {
            if (cart[x].productId === productId) {
              cart[x].quantity = cart[x].quantity + 1;
            }
          }
        }
        return cart;
      })
      .then((cart) => {
        db.collection("users")
          .updateOne({ _id: userId }, { $set: { cart: cart } })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  static deleteCart(productId, userId) {
    console.log(productId, userId);
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: userId })
      .toArray()
      .then((products) => {
        let cart = products[0].cart.filter(
          (item) => item.productId !== productId
        );

        return cart;
      })
      .then((cart) => {
        db.collection("users")
          .updateOne({ _id: userId }, { $set: { cart: cart } })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  static getCart(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: userId })
      .then((products) => {
        const cart = products.cart;
        return db
          .collection("products")
          .find()
          .toArray()
          .then((products) => {
            cart.map((item) => {
              let newProduct = products.find((product) => {
                return product._id.toString() === item.productId;
              });
              item.title = newProduct.title;
              item.price = newProduct.price;
              item.description = newProduct.description;
              item.imgUrl = newProduct.imgUrl;

              return item;
            });
            return cart;
          })
          .catch((err) => console.log(err));
      });
  }
  static fetchById(id) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }
}
module.exports = User;
