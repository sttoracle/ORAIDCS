var secrets = require('../config/secrets');
var async = require('async');
IDCSRestClient = require('node-rest-client').Client

var slist = {};
var rptclient = new IDCSRestClient();


/*exports.getrpt = function(req, res) {
  var args = {
	   headers: { 
            "Authorization": "Bearer " + req.session.idcsAccessToken
       }
   };
      
  rptclient.get("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/AuditEvents?filter=(eventId sw \"admin.user\" or eventId sw \"admin.me\")&count=1000", args, function (data, response) {
      var records = data.resources;
      
      res.json(data);
   });
};*/


exports.getrpt = function(req, res) {
  var args = {
	   headers: { 
            "Authorization": "Bearer " + req.session.idcsAccessToken
       }
   };
    
    
      
  rptclient.get("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/AuditEvents?filter=(eventId sw \"admin.user\" or eventId sw \"admin.me\")&count=1000", args, function (data, response) {
      var records = data.Resources;
      async.each(records, function(rec, callback) {
              var eventTokens = rec.eventId.split(".");
              if(eventTokens.length == 5){
                  rec.userEvent = eventTokens[2] + " " + eventTokens[3];
                  rec.eventStatus = eventTokens[4];          
              }else{
                  rec.userEvent = eventTokens[2];
                  rec.eventStatus = eventTokens[3];
              }
              var statusMap = {"create":"Create", "replace":"Update", "delete": "Delete", 
                           "deactivated":"Disable", "activated":"Enable",
                           "password reset": "Password Reset"
                          };

              rec.userEvent = statusMap[rec.userEvent];

              rptclient.get("https://" + secrets.idcshost + ":" + secrets.idcsport + "/admin/v1/Users/" + rec.adminResourceId, args, function (data2, response2) {
                  rec.userDisplayName = data2.displayName;
                  rec.userName = data2.userName||(rec.adminResourceName||rec.adminResourceId);
                  callback();
              });
                   
        }, function(err) {
            if( err ) {
              console.log('User Fetch failed');
            } else {
              res.json(data);
            }
       });
      
   });
};

function filterData(){
    
}



