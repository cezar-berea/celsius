var express = require("express"),
    config = require("../../config"),
    passport = require("passport"),
    passportGoogle = require("passport-google"),

    User = require("../models/user");

passport.use(new passportGoogle.Strategy({
  returnURL: config.get("url") + "/auth/google/callback",
  realm: config.get("url")
}, function (id, profile, done) {
  var email = profile.emails[0].value,
      name = profile.name.givenName + " " + profile.name.familyName;

  User.findOrCreate({ email: email }, { name: name }, done);
}));

passport.serializeUser(function(user, done) {
  console.log("serializing user:", user);
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  console.log("deserializing user:", userId);
  User.find(userId, done);
});

module.exports = function(app) {
  var router = express.Router(),
      authenticateMiddleware = passport.authenticate("google", {
        successRedirect: "/",
      });

  router.get("/google", authenticateMiddleware);
  router.get("/google/callback", authenticateMiddleware);
  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  return router;
};
