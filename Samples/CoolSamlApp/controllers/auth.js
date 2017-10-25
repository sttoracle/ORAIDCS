var passport = require('passport')
  , OIDCSSamlStrategy = require('passport-saml').Strategy;
var secrets = require('../config/secrets');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var oidcSamlInstance = new OIDCSSamlStrategy(secrets.idcs,
  function(profile, done) {
		return done(null,
			{
				id : profile.userid,
				email : profile.email,
				firstName : profile.firstname,
  				lastName : profile.lastname,
  				issuer : profile.issuer._,
  				nameID : profile.nameID,
  				nameIDFormat : profile.nameIDFormat
			});
	}
);
passport.use(oidcSamlInstance);

exports.idcs = passport.authenticate('saml',  { successRedirect : '/welcome', failureRedirect : '/' });
exports.idcsCallback = passport.authenticate('saml', { failureRedirect: '/', failureFlash: true });
/*exports.idcsLogout = function(req, res) {
    if(!(require('url').parse(req.url,true).query.SAMLRequest))
    {
        oidcSamlInstance.logout(req, function(err, request){
        	if(!err){            
           		res.redirect(request);
        	}
    	});
    } else {
    	req.logout();
  		req.session.destroy();
  		res.redirect('/');
    }
};*/

exports.idcsLogout = function(req, res) {
   oidcSamlInstance.logout(req, function(err, request){
        	if(!err){            
           		res.redirect(request);
        	}
    	});
};

exports.logout = function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};

exports.test = function(req, res) {
  res.redirect('/welcome');
};
