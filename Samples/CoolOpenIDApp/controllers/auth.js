var passport = require('passport')
  , OIDCSStrategy = require('passport-oauth-oidcs').Strategy;
var secrets = require('../config/secrets');


IDCSRestClient = require('node-rest-client').Client

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var oidcsstrgt = new OIDCSStrategy(secrets.idcs,
  function(req, accessToken, refreshToken, profile, done) {
      req.session.idcsAccessToken = accessToken;
      console.log(accessToken);
      return done(null, profile);
  }
);

passport.use(oidcsstrgt);

exports.idcs = passport.authenticate('oidcs');
exports.idcsCallback = passport.authenticate('oidcs', { successRedirect: '/welcome',
                                      failureRedirect: '/' });

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
