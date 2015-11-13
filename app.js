(function() {
    //start of function
  var app = angular.module('Simon', []);

app.factory('memory', function(){

  var storage = {};
  storage.xyphone = xylo;
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', '$interval', function($scope, memory, $interval){
    $scope.instrum = memory; // load service
    $scope.set_styling = function (input) {
        return { "height": input.length, "box-shadow": input.color }
    };
    $scope.power = false;//changes with checkbox
    $scope.playing = false;
    $scope.strict = false;
    $scope.showingDemo = false;
    $scope.Snape = function () {
        if ($scope.strict == false && $scope.power && !$scope.playing){
            $scope.strict = true;
        }
        else {
            $scope.strict = false;
        }
    };
    $scope.count = 0;
    $scope.Play = function () {
        if ($scope.playing == false && $scope.power){
            $scope.playing = true;
            $scope.NewSeq();
            $scope.count = 0;
            //wait a few secs. render click blocker element
            //play level(1)
        }
        else {
            $scope.playing = false;
        }
    };
    //  sequence stuff
    $scope.seq = [];
    $scope.tempo = 1000;
    $scope.entered = [];
    $scope.NewSeq = function () {
        for (var i=0;i<20;i++){
            $scope.seq.push(Math.floor(Math.random() * 8));
        }
        console.log($scope.seq);
    };
    $scope.playLevel = function(num){
        $scope.count = num;
        for (var i=0; i < level; i++){
            //play seq[level-1]
        }
        //short delay, run wait for player input function

    };
    

    $scope.Play = function(seqNumber){
        //light the corresponding bar
        //play the corresponding tune
        //use delays to time things.
    
    };
    $scope.Listen = function (){
            // turn off  click blocker element
        
        
        //if timeout or fail, show frown, delay, playLevel(num)
        //if sucess, show happy, delay, playLevel(num+1);
    };
    
    


    
    
    
    
    
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