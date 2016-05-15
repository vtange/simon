describe('Xymon Game: ', function() {

  var scope;
  var ctrl;

  beforeEach(module('Simon'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('Game', function() {

	//power is off, new game should not work
	beforeEach(function() {
		scope.NewGame();
		scope.Snape();
	});

	it('should not be playing', function() {
		expect(scope.playing).to.equal(false);
    });

	it('should not be strict mode without power', function() {
		expect(scope.strict).to.equal(false);
    });
	  
	  describe('strict mode and new game with power', function() {
		  
		beforeEach(function () {
			scope.power = true;
			scope.Snape();
			scope.NewGame();
		});

		it('should be playing', function() {
			expect(scope.playing).to.equal(true);
		});

		it('should be strict mode now', function() {
			expect(scope.strict).to.equal(true);
		});
		  describe('cutting off power', function() {

			beforeEach(function () {
				scope.CutPower();
			});

			it('stopped playing', function() {
				expect(scope.playing).to.equal(false);
			});
			it('strict mode out', function() {
				expect(scope.strict).to.equal(false);
			});
		  });
	  });
  });
});
