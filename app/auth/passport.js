const passport = require("passport");
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      //Check customer
      User.findOne({ email: email })
        .then((user) => {
          console.log(user);
          if (!user) {
            console.log(`User not found`)
            return done();
          } else {
            return done(null, user);
          }
          //Match Password
          // bcrypt.compare(password, user.password, (error, isMatch) => {
          //   if (error) throw error;
          //   if (isMatch) {
          //     return done(null, user);
          //   } else {
          //     return done();
          //   }
          // });
        })
        .catch((error) => console.log(error));
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});
