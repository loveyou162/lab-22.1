const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoDB = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const multer = require("multer");
const routerUser = require("./routers/user");
const routerPost = require("./routers/post");
const server = require("http").Server(app);
const ListPostDB = require("./data/PostDB");
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const store = new MongoDB({
  uri: "mongodb+srv://caoboi520:Aw8umOX1tKDxMVsg@cluster0.fdehoqk.mongodb.net/lab21?retryWrites=true&w=majority&appName=Cluster0",
  collection: "sessions",
});
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      (Math.random() * 10000000).toFixed(0).toString() + "-" + file.originalname
    );
  },
});
// kiểm tra xem có phải ảnh hay không
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("image")
);
app.use(flash());
app.use(express.static(path.join(__dirname, "/")));

// router liên quan đến user
app.use("/user", routerUser);
app.use("/post", routerPost);
server.listen(5000);
io.on("connection", (soket) => {
  soket.on("addpost", (data) => {
    ListPostDB.find({ userId: data.id }).then((list) => {
      console.log(list);
      io.emit(data.id, list);
    });
  });
  soket.on("updatepost", (data) => {
    ListPostDB.find({ userId: data.id }).then((list) => {
      io.emit(data.id, list);
    });
  });
  soket.on("deletepost", (data) => {
    ListPostDB.find({ userId: data.id }).then((list) => {
      io.emit(data.id, list);
    });
  });
});
app.get("/", (req, res) => res.send("server"));
