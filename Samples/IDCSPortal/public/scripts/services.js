'use strict';

angular.module('idcsPortalApp')

    .factory('regFactory', ['$resource', function($resource) {
    
            var regfac = {};
     
            regfac.initRegistration = function(){
                return $resource("/api/register", null, {'update':{method:'PUT' }});
            };
    
            return regfac;
    
        }])


    .service('baseFactory', ['$resource', function($resource) {
    
                this.getLoggedinUser = function(){
                    
                    return $resource("/api/loggedin",null, null);
                    
                };
                        
        }]) 

    .service('reportFactory', ['$resource', function($resource) {
    
                this.getReport = function(){
                    
                    return $resource("/api/getreport/:rid",null, null);
                    
                };
                        
        }])  
    
;
