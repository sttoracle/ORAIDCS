// Load modules.
var OAuth2Strategy = require('passport-oauth2')
  , util = require('util')
  , url = require('url')
  , crypto = require('crypto')
  , OAuth2 = require('oauth').OAuth2
  , querystring= require('querystring')
  , Profile = require('./profile')
  , RestClient = require('node-rest-client').Client
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError
  , OIDCSUserError = require('./errors/oidcsuserapierror');

//This method is the workaround since OAuth module passes client ID and client sectrets as parameter, that IDCS does not support. 
//IDCS needs these values to be passed in header using base64 encoding
OAuth2.prototype.getOAuthAccessToken = function(code, params, callback) {
  var params= params || {};
  var codeParam = (params.grant_type === 'refresh_token') ? 'refresh_token' : 'code';
  params[codeParam]= code;

  var post_data= querystring.stringify( params );
  var post_headers= {
       'Content-Type': 'application/x-www-form-urlencoded'
   };


  this._request("POST", this._getAccessTokenUrl(), post_headers, post_data, null, function(error, data, response) {
    if( error )  callback(error);
    else {
      var results;
      try {
        results= JSON.parse( data );
      }
      catch(e) {
        results= querystring.parse( data );
      }
      var access_token= results["access_token"];
      var refresh_token= results["refresh_token"];
      delete results["refresh_token"];
      callback(null, access_token, refresh_token, results); // callback results =-=
    }
  });
}
  
function Strategy(options, verify) {
  options = options || {};
  
  if (!options.discoveryURL) { throw new TypeError('OIDCS Strategy requires a discoveryURL option'); }
  if (!options.profileURL) { throw new TypeError('OIDCS Strategy requires a profile URL option'); }
  
  options.scope = options.scope||['openid urn:opc:idm:__myscopes__'];
    
  var headerMap = {};
  headerMap['Authorization'] = 'Basic '+ new Buffer(options.clientID +':'+options.clientSecret).toString('base64');
  options.customHeaders = headerMap;
  
    //Set Dummy Values. We will retrive the values from Discovery service
    options.authorizationURL="Dummy";
    options.tokenURL = "Dummy";
    options.userinfoURL = "Dummy";
    
    
  OAuth2Strategy.call(this, options, verify);
  this.name = 'oidcs';
  
  var oauthHandle= this._oauth2;
  var self = this;
  this._discoverEndPoints(options, function(){
      oauthHandle._authorizeUrl = options.authorizationURL;
      oauthHandle._accessTokenUrl = options.tokenURL;
      self._userinfoURL = options.userinfoURL;
      self._profileURL = options.profileURL;
      self._logoutURL = options.logoutURL;
      self._key = options.sessionKey || ('oauth2:' + url.parse(options.authorizationURL).hostname);
  });
}
// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  var getUserNameUrl = url.parse(this._userinfoURL);
  var profileSearchURL = this._profileURL;
  var preferred_username = "";
  var oauthHandle = this._oauth2;
  this._oauth2.useAuthorizationHeaderforGET(true);

  this._oauth2.get(getUserNameUrl, accessToken, function (err, body, res) {
    var json;
    
    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }
      
      if (json && json.error && typeof json.error == 'object') {
        
        return done(new OIDCSUserError('Failed to fetch user name', err));
      }
      return done(new InternalOAuthError('Failed to fetch user name', err));
    }
     
    try {
      json = JSON.parse(body);
      preferred_username = json.preferred_username;
      if (!preferred_username)
    	return done(new Error('User Name not found'));
        var profileURL = url.parse(profileSearchURL) ;
    
       oauthHandle.get(profileURL, accessToken, function (err2, body2, res2) {
 
    		var userjson;
    		if (err2) {
      			if (err2.data) {
        			try {
          				userjson = JSON.parse(err2.data);
        			} catch (_) {}
      			}
      
      			if (userjson && userjson.error && typeof userjson.error == 'object') {
        			return done(new OIDCSUserError('Failed to fetch user profile', err2));
      			}
      			return done(new InternalOAuthError('Failed to fetch user profile', err2));
    		}
    
     		try {
      			userjson = JSON.parse(body2);
       			var profile = Profile.parse(userjson);
       			profile._raw = body2;
       			profile._json = userjson;

       			return done(null, profile);
    		} catch (ex) {
      			return done(new Error('Failed to parse user profile'));
    		}
   		});  
    } catch (ex) {
      return done(new Error('Failed to parse user name search data'));
    }
    
  });
};

Strategy.prototype.logout = function(req, callback) {
    console.log(this._logoutURL);
    console.log("Logout not yet supported");
};

/**
 * Discover and set OAuth end-points.
 *
 * @param {opt} options object
 * @api private
 */

Strategy.prototype._discoverEndPoints = function(opt, callback) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var client = new RestClient();
    var args = {};
    client.get(opt.discoveryURL, args, function (data, response) {
    opt.authorizationURL = data["openid-configuration"].authorization_endpoint;
    opt.tokenURL = data["openid-configuration"].token_endpoint;
    opt.userinfoURL = data["openid-configuration"].userinfo_endpoint;
    opt.logoutURL = data["openid-configuration"].end_session_endpoint;
    callback();
   });
};

module.exports = Strategy;





