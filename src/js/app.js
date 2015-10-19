var app = angular.module('front',[
	'ui.router',
	'ngResource',
	'ngAnimate'
	])
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
    .state('/', {
        url: "/",
        controller : 'UsersListCtrl',
        templateUrl: 'src/tpls/users-list.html'
    });
    $urlRouterProvider.otherwise('/');
})
.controller('UsersListCtrl', ['$resource','$scope',function($resource,$scope) {
	$scope.apiURLs = {
		randomuserURL: "https://randomuser.me/api/?results=10"
	};
	
	var ApiEndpoint = $resource($scope.apiURLs.randomuserURL);

	ApiEndpoint.get().$promise.then(function(data){
		$scope.userList = data.results;
	});
	
	$scope.selectUser = function(index){
		$scope.activeUser = $scope.activeUser != index ? index : -1
	};

	$scope.isActiveUser = function(index){
		return $scope.activeUser == index;
	};
	
	$scope.getGenderIconClass = function(gender){
		return gender=="male" ? 'fa-male' : 'fa-female'
	};

}])

.directive('detailedInfo',function(){
	return {
		restrict : 'A',
		templateUrl : 'src/tpls/user-detailes.html'
	}
});