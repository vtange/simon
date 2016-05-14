describe('Tic Tac Toe Game: ', function() {

  var scope;
  var ctrl;

  beforeEach(module('Simon'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('Game', function() {

	//always reset board
	beforeEach(function() {
	});

	it('should be offline', function() {
		expect(scope.power).to.equal(false);
	});

	it('should not be playing', function() {
		expect(scope.playing).to.equal(false);
    });

  });
});
