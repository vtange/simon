(function() {
    //start of function
  var app = angular.module('Simon', []);

app.factory('memory', function(){

  var storage = {};
  storage.xyphone = xylo;
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.instrum = memory; // load service
    $scope.set_styling = function (input) {
        return { "height": input.length, "box-shadow": input.color }
    }
    $scope.power = false;//changes with checkbox
    $scope.playing = false;
    $scope.strict = false;
    $scope.showingDemo = false;
    $scope.count = 0;
    $scope.Play = function () {
        if ($scope.playing == false){
            $scope.playing = true;
        }
        else {
            $scope.playing = false;
        }
    };
    $scope.Snape = function () {
        if ($scope.strict == false){
            $scope.strict = true;
        }
        else {
            $scope.strict = false;
        }
    };
    //  sequence stuff
    $scope.seq = [];
    $scope.tempo = 1000;
    $scope.entered = [];
    
    
    
    $scope.NewSeq = function () {};
    $scope.PlaySeq = function (){};
    $scope.Listen = function (){};
    
    
    
            //generate a 20 num array
            
            //play that array
            
            //on error, if strict is on, ^ these two
            
            //
            
            
            
            
            
    
    
    
    
    
    
/*    secs -= 1;
    if (secs < 0) {
      // countdown is finished
      
      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
			audio.play();
      
      */
}]);//end of controller
  //end of function
})();