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
exports.idcsCallback = passport.authenticate('oidcs', { successRedirect: '/',
                                      failureRedirect: '/' });
exports.checklogin = function(req, res) { 
    res.send(req.isAuthenticated() ? req.user : '0'); 
};

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};

/**
 * Anonymous authentication to obtain access token for self-registration
 *
 * @param {Object} req
 * @api public
 */
exports.idcsanon = function(options, callback) {
   var anonclient = new IDCSRestClient();
  
   //var postData = encodeURIComponent("grant_type=" + options.grant_type + "&scope=" + options.scope) ;
    var postData = "grant_type=" + options.grant_type + "&scope=" + options.scope;
    var base64Creds = "Basic " + new Buffer(options.clientID +":"+options.clientSecret).toString("base64");
    var args = {
	   headers: { 
                    "Authorization": base64Creds,
                    "Content-Type" : "application/x-www-form-urlencoded; charset=utf-8"
                },
       data: postData
    };
    
    anonclient.post(options.tokenURL, args, function (data, response) {
        callback(data.access_token);
    });
};

