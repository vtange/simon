(function() {
    //start of function
  var app = angular.module('Simon', []);

app.factory('memory', function(){

  var storage = {};
  storage.xyphone = xylo;
  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', '$timeout', '$interval', function($scope, memory, $timeout, $interval){
    $scope.instrum = memory; // load service
    $scope.set_styling = function (input) {
        if (input.playing) {
            return { "height": input.length, "box-shadow": input.color }
        }
        else{
        return { "height": input.length }
        };
    };
    $scope.backlight = function (input) {
        if (input.playing) {
            return { "box-shadow": input.light }
        }
        else{
        return {  }
        };
    };
    $scope.power = false;//changes with checkbox
    $scope.playing = false;
    $scope.strict = false;
    $scope.showingDemo = false;
    $scope.CutPower = function () {
        $interval.cancel(play);
        $interval.cancel(unplay);
        if ($scope.playing){
            $scope.playing = false;
            $scope.count = 0;
        }
        if ($scope.strict){
            $scope.strict = false;
        }
    };
    $scope.Snape = function () {
        if ($scope.strict == false && $scope.power && !$scope.playing){
            $scope.strict = true;
        }
        else {
            $scope.strict = false;
        }
    };
        //  sequence stuff
    $scope.seq = [];
    $scope.tempo = 700;
    $scope.playerEntered = [];
    $scope.count = 0;
    $scope.NewGame = function () {
        if ($scope.playing == false && $scope.power){
            $scope.playing = true;
            $scope.NewSeq();
            $scope.count = 0;
            //wait a few secs. render click blocker element
            //playlevel(1)
            $timeout(function(){$scope.playLevel(5)},500);
        }
        else {
            $scope.playing = false;
            $scope.count = 0;
        }
    };
    $scope.NewSeq = function () {
        $scope.seq = [];
        for (var i=0;i<20;i++){
            $scope.seq.push(Math.floor(Math.random() * 8));
        }
        console.log($scope.seq);
    };
    $scope.playLevel = function(num){
        $scope.count = num;
        $scope.PlaySeq($scope.tempo, $scope.count);
        //short delay, run wait for player input function
        $timeout(function(){$scope.Listen()},500);
    };
    $scope.PlaySeq = function(tempo, num){
            var i = 0;
            play = $interval(function(){$scope.Play($scope.instrum.xyphone[$scope.seq[i]])},500);
            unplay = $interval(function(){$scope.UnPlay($scope.instrum.xyphone[$scope.seq[i]]);i+=1},500+tempo);
            var StopSeq = function(){
                    $interval.cancel(play);
                    $interval.cancel(unplay);
            };
            $timeout(function(){StopSeq()},(500+tempo)*num);
    };
    $scope.Play = function(bar){
        //light the corresponding bar
        //play the corresponding tune
        //use delays to time things. prevent clickspam
        //use this for player input as well
        bar.playing = true;
    };
    $scope.UnPlay = function(bar){
        bar.playing = false;
    };
    $scope.Listen = function (){
            // turn off  click blocker element
        console.log("Listening");
        
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