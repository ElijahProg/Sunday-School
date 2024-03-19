const passport = require("passport");
exports.loginView = async function (req, res) {
  res.render("login");
};
exports.authenticator = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.render("login", { email, password, title: "Login" });
    } else {
      passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res, next);
    }
  } catch (ex) {
    console.log(`Exception on authentication:${ex}`);
    res.redirect("/login");
  }
};
