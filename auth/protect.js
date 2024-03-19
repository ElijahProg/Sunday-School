exports.protectRoute = function(req,res,next){
    if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
}
exports.allowIf = function(req,res,next){
    if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');
}

function next() {
    console.log(arguments)
  }