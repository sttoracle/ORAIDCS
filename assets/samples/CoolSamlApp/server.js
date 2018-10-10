var express = require('express');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var secrets = require('./config/secrets');
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');



var PORT = process.env.PORT || 9092;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
router.post('/auth/provider/callback', authController.idcsCallback, function(req, res) {
  res.redirect(req.session.returnTo || '/welcome');});
//router.get('/auth/logout', authController.idcsLogout);
//
router.get('/auth/logout2', authController.idcsLogout);
router.get('/auth/logout', authController.logout);
//router.post('/auth/logout/callback', authController.logout);
//
router.get('/auth/locallogout', authController.logout);

app.use(router);


var server = app.listen(PORT, function () {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});
