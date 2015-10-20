describe('Front-test-api suit:', function () {

	beforeEach(module('front'));


  	describe('UsersListCtrl :', function () {
  
		var scope, createController;

		beforeEach(inject(function($rootScope, $controller){
			scope = $rootScope.$new();
			createController = function(){
				return $controller('UsersListCtrl', {'$scope' : scope});
			}
		}));

        it('selected should change activeUser', function(){
            var controller = createController();

            scope.selectUser(1);
            expect(scope.activeUser).toBe(1); 
        }); 

        it('isActiveUser should return true/false', function(){
            var controller = createController();

            expect(scope.isActiveUser(-2)).toBe(false);

            scope.selectUser(1);
            expect(scope.isActiveUser(1)).toBe(true);
        });

        it('getGenderIconClass', function(){
            var controller = createController();

            expect(scope.getGenderIconClass("male")).toBe("fa-male");           
         	expect(scope.getGenderIconClass("female")).toBe("fa-female");
        });
    });

	describe('UsersSrvc: ', function(){
		var mockUserSrvc, $httpBackend;

		beforeEach(function(){
			angular.mock.inject( function($injector){
				$httpBackend = $injector.get('$httpBackend');
				mockUsersSrvc = $injector.get('UsersSrvc');
			});
		});

		it('should have url and method defined',function(){
			expect(mockUsersSrvc.getUsers).toBeDefined();
			expect(mockUsersSrvc.url).toBeDefined();
		});

		it('should call resource with params', function(){
			var param = 5;
			var mockResults = new Array(5);
			var results;
			$httpBackend.expectGET('https://randomuser.me/api'+'?results='+ param)
				.respond({data:mockResults});

			mockUsersSrvc.getUsers(param).then(function(data){
				results = data;
			});

			$httpBackend.flush();

			expect(results.data.length).toEqual(5);

		});

		it('should call resource with params', function(){

			var mockResults = new Array(1);
			var results;
			$httpBackend.expectGET('https://randomuser.me/api')
				.respond({data:mockResults});

			mockUsersSrvc.getUsers().then(function(data){
				results = data;
			});

			$httpBackend.flush();
			
			expect(results.data.length).toEqual(1);

		});
	});
});