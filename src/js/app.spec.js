describe('Front-test-api suit:', function () {

	beforeEach(module('front'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('UsersListCtrl :', function () {
  
        it('apiURLs should be defined', function () {
            var $scope = {};
            var controller = $controller('UsersListCtrl', { $scope: $scope });        
  
            expect($scope.apiURLs).toBeDefined();
        });

        it('selected should change activeUser', function(){
        	var $scope = {};
            var controller = $controller('UsersListCtrl', { $scope: $scope });  

            $scope.selectUser(1);
            expect($scope.activeUser).toBe(1); 
        }); 

        it('isActiveUser should return true/false', function(){
        	var $scope = {};
            var controller = $controller('UsersListCtrl', { $scope: $scope });

            expect($scope.isActiveUser(-2)).toBe(false);

            $scope.selectUser(1);
            expect($scope.isActiveUser(1)).toBe(true);
        });

        it('getGenderIconClass', function(){
        	var $scope = {};
            var controller = $controller('UsersListCtrl', { $scope: $scope });

            expect($scope.getGenderIconClass("male")).toBe("fa-male");           
         	expect($scope.getGenderIconClass("female")).toBe("fa-female");
        });
    });
});