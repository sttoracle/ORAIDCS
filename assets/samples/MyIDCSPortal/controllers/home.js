var secrets = require('../config/secrets');
var authController = require('./auth');

IDCSRestClient = require('node-rest-client').Client
var anonclient = new IDCSRestClient();

exports.index = function(req, res) {
  res.redirect('/');
};

exports.welcome = function(req, res) {
  res.send('welcome');
};

exports.register = function(req, res) {
    authController.idcsanon(secrets.idcsanon, function(accesstoken){
        console.log("Here" + JSON.stringify(req.body));
       
        var args = {
	                    requesConfig: { timeout: 1000 },
	                    responseConfig: { timeout: 2000 },
                        data: JSON.stringify(req.body),
                        headers: { 
                            "Authorization": "Bearer " + accesstoken,
                            "Content-Type": "application/json"
                        }
                    };
        anonclient.post("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/Users", args, function (data, response) {
                console.log(data);
                res.json(data);
        });
        
    });
};

/*exports.registerpassword = function(req, res) {
    authController.idcsanon(secrets.idcsanon, function(accesstoken){
        console.log("Here" + JSON.stringify(req.body));
       
        var args = {
	                    requesConfig: { timeout: 1000 },
	                    responseConfig: { timeout: 2000 },
                        data: JSON.stringify(req.body),
                        headers: { 
                            "Authorization": "Bearer " + accesstoken,
                            "Content-Type": "application/json"
                        }
                    };
        anonclient.put("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/UserPasswordChanger/" + req.params.id, args, function (data, response) {
                console.log(data);
                res.json(data);
        });
        
    });
};*/
    
    

exports.checkuser = function(req, res) {
    authController.idcsanon(secrets.idcsanon, function(accesstoken){
       
       var args = {
	               headers: { 
                       "Authorization": "Bearer " + accesstoken
                   }
        };
        console.log(req.params.name);
    
        anonclient.get("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/Users?filter=username eq \"" + req.params.name + "\"" , args, function (data, response) {
                console.log(data.totalResults);
                if(data.totalResults > 0)
                    res.send("true");
                else
                    res.send(404);
        });
   });      
};



