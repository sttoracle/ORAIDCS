var express = require('express');
var path = require('path');
var passport = require('passport');
var session = require('express-session');

var secrets = require('./config/secrets');
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');



var PORT = process.env.PORT || 9090;
var app = express();

app.use(session({
  secret: secrets.sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var router = express.Router();

router.get('/', homeController.index);
router.get('/welcome', homeController.welcome);
router.get('/auth/idcs', authController.idcs);
router.get('/auth/provider/callback', authController.idcsCallback, function(req, res) {
  res.redirect(req.session.returnTo || '/');});
router.get('/auth/logout', authController.logout);

app.use(router);


var server = app.listen(PORT, function () {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});
