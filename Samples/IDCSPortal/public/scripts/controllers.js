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

    .controller('reportingController', ['$scope', '$stateParams', 'reportFactory', '$timeout', '$filter', function($scope, $stateParams, reportFactory, $timeout, $filter){
            $scope.rid = $stateParams.reportid;
            $scope.showDetails = false;
        
            $scope.toggleDetails = function () {
               $scope.showDetails = !$scope.showDetails;   
            };
        

            var updateChartData = function(){ 
                if($scope.eventArray){    
                    var currentEvents = $scope.eventArray;
                    currentEvents = $filter('filter')(currentEvents, {'userName':$scope.userName});
                    currentEvents = $filter('filter')(currentEvents, {'userEvent':$scope.userEvent});
                    currentEvents = $filter('datecheck')(currentEvents, $scope.fromDate, 'timestamp',true);
                    currentEvents = $filter('datecheck')(currentEvents, $scope.toDate, 'timestamp',false);
                    var totalCreate = filterEvents(currentEvents, {userEvent:'Create'}).length;
                    var totalUpdate = filterEvents(currentEvents, {userEvent:'Update'}).length;
                    var totalDelete = filterEvents(currentEvents, {userEvent:'Delete'}).length;
                    var totalEnable = filterEvents(currentEvents, {userEvent:'Enable'}).length;
                    var totalDisable = filterEvents(currentEvents, {userEvent:'Disable'}).length;
                    var totalPwsReset = filterEvents(currentEvents, {userEvent:'Password Reset'}).length;
                
                    $scope.labels = ['Create', 'Update', 'Delete', 'Disable', 'Enable', 'Password Reset'];
                    $scope.data = [totalCreate, totalUpdate, totalDelete, totalDisable, totalEnable, totalPwsReset];
                    $scope.options = {responsive: true};  
                    
                }
            };
        
            $scope.$watch('userName', function(){
                updateChartData();
            })
            
            $scope.$watch('userEvent', function(){
                updateChartData();
            })
            
            $scope.$watch('fromDate', function(){
                updateChartData();
            })
            
            $scope.$watch('toDate', function(){
                updateChartData();
            })
        
            var filterEvents = function(currentEvents, criteria){
               return $filter('filter')(currentEvents, criteria);
            };
        
          
            reportFactory.getReport().get({rid:$scope.rid})
                .$promise.then( 
                    function(response){
                        $scope.eventDataArray = response.Resources;
                        $scope.eventDataArray = $filter('filter')($scope.eventDataArray, function(item) {
                                                                        return  (item.eventStatus === 'success') && 
                                                                                ((item.userEvent === 'Create')||(item.userEvent === 'Update')||(item.userEvent === 'Delete')
                                                                                 ||(item.userEvent === 'Enable')||(item.userEvent === 'Disable')||(item.userEvent === 'Password Reset'));
                                                                        }
                                                );
                        $scope.eventArray = $scope.eventDataArray;
                        updateChartData();
                    },
                    function(response){
                        console.log(response);
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
        
           
            $scope.onClick = function (points, evt) {
                console.log(points[0]);
              };

        }])

;

