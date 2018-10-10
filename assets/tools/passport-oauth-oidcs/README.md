# passport-oauth-oidcs

[Passport](http://passportjs.org/) strategy for authenticating with [Oracle IDCS](https://www.oracle.com/cloud/paas/identity-cloud-service.html).

This module lets you authenticate using Oracle IDCS in your Node.js applications using 3-legged OAuth flow.
Once authentication is accomplished, it continues to maintain the session, so that your application can seamlessly access OAuth resources. 
By plugging into Passport, IDCS authentication can be easily and unobtrusively integrated into any application or framework 
that supports [Connect](http://www.senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

The startgey leverages IDCS discovery feature of dynamically finding the Authorization and Token end-points

## Install

    $ npm install passport-oauth-oidcs

## Usage

#### Create an Application

Before using `passport-oauth-oidcs`, you must register an client application with Oracle IDCS. 
The application must be granted the necessary access to the target OAuth resources and admin "Me" API. 
Your application will be issued an app ID and app secret, which need to be provided to the strategy.
You will also need to configure a redirect URI which matches the route in your application.

#### Configure Strategy

The IDCS authentication strategy authenticates users using an IDCS account and OAuth 2.0 tokens.  
The app ID and secret obtained when creating an application are supplied as options when creating the strategy.  
The strategy also requires a `verify` callback, which receives the access token, as well as `profile` 
which contains the authenticated user's IDCS profile. The `verify` callback must call `done` providing a user to
complete authentication.

```js
var oidcsstrgt = new OIDCSStrategy(secrets.idcs,
function(req, accessToken, refreshToken, profile, done) {
req.session.idcsAccessToken = accessToken;
return done(null, profile);
}
);

passport.use(oidcsstrgt);
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'IDCS'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
exports.idcs = passport.authenticate('oidcs');
exports.idcsCallback = passport.authenticate('oidcs', { successRedirect: '/',
failureRedirect: '/' });

router.get('/login', authController.idcs);
router.get('/login/callback', authController.idcsCallback, function(req, res) {
res.send(req.user);});

```

## Examples

## License

[The MIT License](http://opensource.org/licenses/MIT)