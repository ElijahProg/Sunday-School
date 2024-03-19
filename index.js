const express = require("express")
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const { loginCheck } = require("./app/auth/passport");
var compression = require("compression");
var multer = require("multer");
var morgan = require("morgan");
var async = require("async");
dotenv.config();
var path = require("path");
const User = require("./app/models/User")

const oneDay = 1000 * 60 * 60 * 24;
const { dbUrl } = require("./config");

const PORT = process.env.PORT || 8989;

app.use(morgan("combined"));
var bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "secret$%^134",
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
    resave: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

function parallel(middlewares) {
  return function (req, res, next) {
    async.each(
      middlewares,
      function (mw, cb) {
        mw(req, res, cb);
      },
      next
    );
  };
}

app.use(
  parallel([
    express.static("./public", { maxAge: "10y" }),
    express.static("./data", { maxAge: "1d" }),
    compression(),
    bodyParser.json({ limit: "50mb" }),
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 1000000,
    }),
    multer({ dest: __dirname + "/upload/" }).any(),
  ])
);

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.set("views", [
  path.join(__dirname, "./app/views"),
  path.join(__dirname, "./app/views/common"),
  path.join(__dirname, "./app/views/kids"),
]);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(
  "/",
  require("./app/routes/user"),
  require("./app/routes/login"),
  require("./app/routes/setting"),
  require("./app/routes/kids")
);
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  const options = {
    useNewUrlParser: true,
  };

  const connection = await mongoose.connect(dbUrl, options);

  if (connection)
    console.log("\x1b[32m%s\x1b[0m", "Database Connected Successfully...");
  var defaultUser = await checkFirstUser();
console.log(defaultUser)
});


async function checkFirstUser() {
  try {
    var users = await User.find({});
    console.log(users.length)
    if (users.length === 0) {
      var defaultUser = new User({
        name: "Super Admin",
        email: "admin@atbiya.com",
        password: "P@ssw0rd",
      })
      await defaultUser.save();
      return { success: "User Created!!" }
    } else {
      return { success: "Default User already there!!" }
    }
  } catch (ex) {
    console.log(`Exception:${ex}`)
  }
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });



app.get("/init", function (req, res) {
  //   res.end("app initialized properly");
  res.render("common/header");
});

