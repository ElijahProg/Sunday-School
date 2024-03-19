exports.loginView = async function (req, res) {
  try {
    res.render("login");
  } catch (ex) {
    console.log(ex);
    res.send("<h1>System Error</h1>\n" + ex);
  }
};
