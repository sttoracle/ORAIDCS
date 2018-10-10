angular.module('idcsPortalApp')
    
    .controller('baseController', ['$scope',  'baseFactory', function($scope, baseFactory){
        $scope.showUser = false;
        
        $scope.loggedinUser = baseFactory.getLoggedinUser().get(function(response) {
                    $scope.loggedinUser = (response["0"]=="0")?response["0"]:response["User Name"];
                    if($scope.loggedinUser != "0")
                        $scope.showUser = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                    $scope.showUser = false;
                });
    }])

    .controller('regController', ['$scope',  'regFactory', function($scope, regFactory){
         $scope.success = false; 
         $scope.uid = ""; 
         $scope.email = "";
         $scope.useremailcombo = true;
         $scope.idemaillabel = "User Name / Email";
         $scope.registrationuser = {schemas:["urn:ietf:params:scim:schemas:core:2.0:User"], active:true, emails: []};
         $scope.changeUserEmailForm = function(){
             $scope.idemaillabel = $scope.useremailcombo?"User Name / Email":"Email";
         };
         $scope.register = function(){
             $scope.populateDerivedValues();
             console.log($scope.registrationuser);
             regFactory.initRegistration().save($scope.registrationuser, function(response) {
                    console.log(response.id);
                    $scope.uid = response.id;
                    $scope.success = true;
                    $scope.clear();
                },
                function(response) {
                        console.log(response);
                        console.log("Error: "+response.status + " " + response.statusText);
                });
         };
        
        $scope.clear = function(){
             $scope.uid = ""; 
             $scope.email = "";
             $scope.useremailcombo = true;
             $scope.idemaillabel = "User Name / Email";
             $scope.registrationuser = {schemas:["urn:ietf:params:scim:schemas:core:2.0:User"], active:true, emails: []};
             $scope.registerForm.$setPristine();
        }
        
        $scope.populateDerivedValues = function(){
            
            $scope.registrationuser.emails.push({value: $scope.email, primary: true, type:"home", verified:true});
            $scope.registrationuser.emails.push({value: $scope.email, type:"recovery"});
            
            $scope.registrationuser.userName = $scope.useremailcombo?$scope.email:$scope.registrationuser.userName;
            
            $scope.registrationuser.name.formatted = $scope.registrationuser.name.givenName + " " + $scope.registrationuser.name.familyName;
        }
    }])

;

