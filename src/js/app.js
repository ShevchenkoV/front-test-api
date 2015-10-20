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
.controller('UsersListCtrl', ['$scope','$stateParams','UsersSrvc',function($scope, $stateParams,UsersSrvc) {

	var limit = $stateParams.limit;

	UsersSrvc.getUsers(limit)
		.$promise.then(function(data){
			$scope.userList = data.results;
		});
	
	$scope.selectUser = function(index){
		$scope.activeUser = $scope.activeUser != index ? index : -1
	};

	$scope.isActiveUser = function(index){
		return $scope.activeUser == index;
	};
	
	$scope.getGenderIconClass = function(gender){
		return ['fa',gender].join('-');
	};

}])

.service('UsersSrvc', ['$resource', function($resource){
	var url = "https://randomuser.me/api";
	var resource = $resource(url);

	return {
		url : url,
		getUsers : function(param){
			return resource.get({results:param});
		}
	} 
}])

.directive('detailedInfo',function(){
	return {
		restrict : 'A',
		templateUrl : 'src/tpls/user-detailes.html'
	}
});