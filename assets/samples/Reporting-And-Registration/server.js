var express = require('express');
var path = require('path');
var fs = require('fs');
//var https = require('https');
var http = require('http');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require("body-parser");

var secrets = require('./config/secrets');
var homeController = require('./controllers/home');
var authController = require('./controllers/auth');
var rptController = require('./controllers/rpt');


//var PORT = process.env.PORT || 1443;
var PORT = process.env.PORT || 9088;
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


var auth = function(req, res, next){ if (!req.isAuthenticated()) res.send(401); else next(); }; 

var router = express.Router();

router.get('/', homeController.index);
router.get('/welcome', homeController.welcome);
router.get('/login', authController.idcs);
router.get('/login/callback', authController.idcsCallback, function(req, res) {
  res.send(req.user);});
router.get('/logout', authController.logout);
router.get('/loggedin', authController.checklogin);
router.get('/checkuser/:name', homeController.checkuser);
router.post('/register', homeController.register);
router.get('/getreport/:rid', auth, rptController.getrpt);

app.use('/api', router);


var server = http.createServer(app).listen(PORT, function () {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});
