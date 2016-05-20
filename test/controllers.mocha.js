describe('Xymon Game: ', function() {

  var scope;
  var ctrl;
  var audioOriginal, audioMock;

  beforeEach(module('Simon'));

  beforeEach(inject(function($rootScope, $controller) {
	xylo = xylo;//get xylos
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope});
  }));


  describe('Game', function() {

	  //aesthetics, turn off xylo[0] after each test, turn it on during each test
	beforeEach(function(){
		audioOriginal = window.Audio;
		audioMock = { play:function(){}};
        window.Audio = function() { return audioMock; };
	})
	afterEach(function() {
		xylo[0].playing = false;
	});
	  
	it('should set xylo heights', function() {
		expect(scope.set_styling(xylo[0]).height).to.equal(340);
		scope.Play(xylo[0]);
		expect(scope.set_styling(xylo[0])['box-shadow']).to.equal("0px 340px rgba(255, 0, 80, 0.3) inset");
	});

	it('should light up when hovered / played', function() {
		expect(scope.backlight(xylo[0])['box-shadow']).to.equal(undefined);
		scope.Play(xylo[0]);
		expect(scope.backlight(xylo[0])['box-shadow']).to.equal("0px 0px 30px rgba(255, 0, 80, 0.3)");
		expect(scope.hinting(xylo[0])['box-shadow']).to.equal("0px 340px rgba(255, 0, 80, 0.3) inset");
	});

	it('should show mouse guides', function() {
		scope.ShowGuide(xylo[0]);
		expect(xylo[0].guide).to.equal(true);
		scope.ShowGuide(xylo[0]);
		expect(xylo[0].guide).to.equal(false);
	});

	describe('playing without power', function() {
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

		it('should not register any plays', function() {
			scope.Enter({number:1});
			expect(scope.playerEntered).to.deep.equal([]);
		});
	});
	  
	describe('playing with power', function() {

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
		describe('playing a demo', function() {

			beforeEach(function () {
				//don't end demo
				checkend = sinon.stub(scope, 'CheckEnd', function() {});
				scope.PlaySeq();
			});
			it('should be showing demo', function() {
				expect(scope.showingDemo).to.equal(true);
			});
			it('can cut demo short', function() {
				scope.cutDemo();
				expect(scope.showingDemo).to.equal(false);
			});
			it('ends demo when i hits num', function() {
				checkend.restore();
				scope.CheckEnd(4,4);
				//play should've stopped
				expect(scope.showingDemo).to.equal(false);
			});
			it('nothing happens until i hits num', function() {
				checkend.restore();
				scope.CheckEnd(1,4);
				expect(scope.showingDemo).to.equal(true);
			});
		});
		describe('listen mode', function() {

			beforeEach(function () {
				scope.seq = [11,12,13];
				scope.count = 3;
				scope.Listen();
			});
			it('should be listening', function() {
				expect(scope.listening).to.equal(true);
			});
			it('should watch for player plays', function() {
				scope.Enter({number:11});
				expect(scope.playerEntered).to.deep.equal([11]);
			});
			it('should level up on correct play', function() {
				sinon.stub(scope, 'LevelUp', function() {});
				scope.$apply('playerEntered = [11,12,13]')
				expect(scope.LevelUp.callCount).to.equal(1);
			});
			it('should stop listening on correct play', function() {
				sinon.stub(scope, 'LevelUp', function() {});
				scope.$apply('playerEntered = [11,12,13]')
				expect(scope.listening).to.equal(false);
			});
			it('should level up on fail play', function() {
				sinon.stub(scope, 'Failure', function() {});
				scope.$apply('playerEntered = [11,12,14]')
				expect(scope.Failure.callCount).to.equal(1);
			});
			it('should stop listening on fail play', function() {
				sinon.stub(scope, 'Failure', function() {});
				scope.$apply('playerEntered = [11,12,14]')
				expect(scope.listening).to.equal(false);
			});
			it('should change seq if fail', inject(function($timeout) {
				scope.Failure();
				$timeout.flush();
				expect(scope.seq).to.not.deep.equal([11,12,13]);
			}));
			it('should change seq if complete', inject(function($timeout) {
				scope.count = 20;
				scope.LevelUp();
				scope.NewGame();
				$timeout.flush();
				expect(scope.seq).to.not.deep.equal([11,12,13]);
			}));
			it('should not change seq if fail in normal mode (not strict)', inject(function($timeout) {
				scope.strict = false;
				scope.Failure();
				$timeout.flush();
				expect(scope.seq).to.deep.equal([11,12,13]);
			}));
			it('should not change seq if ok', inject(function($timeout) {
				scope.LevelUp();
				$timeout.flush();
				expect(scope.seq).to.deep.equal([11,12,13]);
			}));
		});
	  });
  });
});
