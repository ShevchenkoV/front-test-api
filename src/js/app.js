var app = angular.module('front',[
	'ui.router',
	'ngResource',
	'ngAnimate'
	])
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('main', {
		url : "/",
		templateUrl : 'src/tpls/main.html'
	})
    .state('users-list', {
        url: "/users-list/:limit",
        controller : 'UsersListCtrl',
        templateUrl: 'src/tpls/users-list.html'
    });
    $urlRouterProvider.otherwise('/');
})
.controller('UsersListCtrl', ['$resource','$scope','$stateParams',function($resource,$scope, $stateParams) {
	$scope.apiURLs = {
		randomuserURL: "https://randomuser.me/api"
	};
	
	var ApiEndpoint = $resource($scope.apiURLs.randomuserURL);
	var limit = $stateParams.limit;

	ApiEndpoint.get({results:limit}).$promise.then(function(data){
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