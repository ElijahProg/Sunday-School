const User = require("../models/User");
// const bcrypt = require("bcrypt");

exports.users = async function (req, res) {
  try {
    var users = await User.find({});
    res.render("users", { users: users });
  } catch (ex) {
    console.log(ex);
  }
};
exports.registerUserView = async function (req, res) {
  try {
    res.render("register");
  } catch (ex) {
    console.log(`Exception--->register view ::${ex}`);
  }
};

exports.registerUser = async function (req, res) {
  const { name, email, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    res.render("register", { name, email, password, confirm });
  }
  if (password !== confirm) {
    res.render("register", { name, email, password, confirm });
  } else {
    const user = await User.findOne({ email: email });
    if (user) {
      console.log("user already exists");
      res.redirect("/users");
    } else {
      // const salt = await bcrypt.genSalt(10);
      const hashedPassword = password; //await bcrypt.hash(password, salt);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      console.log("User Created");
      res.redirect("/users");
    }
  }
};
