'use strict';

angular.module('idcsPortalApp', ['ui.router','ngResource', 'ui.bootstrap', 'angularUtils.directives.dirPagination', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ngAnimate', 'ngTouch'])
.directive('ngConfirmClick', [
    function(){
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click',function (event) {
                    var message = attr.ngConfirmMessage;
                    if (message && confirm(message)) {
                        scope.$apply(attr.ngConfirmClick);
                    }
                });
            }
        };
}])

.directive('equal', function() {

    return {
      require: 'ngModel',
      scope: {
        equal: '='
      },
      link: function(scope, elem, attr, ctrl) {

        ctrl.$validators.equal = function(modelValue, viewValue) {
          return modelValue === scope.equal;
        };

        scope.$watch('equal', function(newVal, oldVal) {
          ctrl.$validate();
        });
      }
    };
  })

.directive('checkUserExists', ['$http', function($http) {
  return {
    restrict: 'A',
    require : 'ngModel',
    link : function($scope, element, attr, ngModel) {
        element.on('blur', function (e) {
           ngModel.$loading = false;
           ngModel.$setValidity('unique', true);
           if(attr.checkUserExists && ngModel.$viewValue)
           {
               ngModel.$loading = true;
                return $http.get('/api/checkuser/'+ element.val()).then(function(data) {
                    ngModel.$loading = false;
                    ngModel.$setValidity('unique', !data);
                    $scope.usernameMessage = "Username already taken";
                    element[0].focus(); 
                }, function(data) {
                    ngModel.$loading = false;
                    ngModel.$setValidity('unique', true);
                    $scope.usernameMessage = "Username available";
                });
           }
        });
     }
  };
}])

.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
})

.filter('datecheck', ['$filter', function($filter) {
	return function(input, val, property, from) {
		
		var retArray = [];
        if(!val)
            return input; 
        
        var dtst = $filter('date')(val, 'MM-dd-yyyy HH:mm:ss');
        var dt = new Date(dtst);
        
		angular.forEach(input, function(obj){
			var rdtst = obj[property];
            var rdt = new Date(rdtst);
            
            if(from) {
                if( rdt >= dt)
				    retArray.push(obj);			
			}else {
                if( rdt <= dt)
				    retArray.push(obj);	
            }
		}); 
		
		return retArray; 
	};
}])

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user){
                if (user !== '0')
                     deferred.resolve();
                else {
                        $rootScope.message = 'You need to log in.';
                        deferred.reject();
                        window.location.href = '/api/login';
                        
                    }
            });

            return deferred.promise;
        };

        $httpProvider.interceptors.push(function($q, $location) {
                return {
                            response: function(response) {
                                 return response;
                            },
                            responseError: function(response) {
                                if (response.status === 401)
                                    window.location.href = '/api/login';
                                return $q.reject(response);
                            }
                    };
        });
    
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'baseController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'baseController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
           .state('app.register', {
                url:'register',
                views: {
                    'content@': {
                        templateUrl : 'views/register.html',
                        controller  : 'regController',
                    }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
