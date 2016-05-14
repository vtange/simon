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
    };//dynamic CSS from JSON
    $scope.backlight = function (input) {
        if (input.playing) {
            return { "box-shadow": input.light }
        }
        else{
        return {  }
        };
    };//dynamic CSS from JSON
    $scope.hinting = function (input) {
            return { "box-shadow": input.color }
    };//dynamic CSS from JSON
    $scope.ShowGuide = function (input) {
        if (!input.guide) {
            input.guide = true;
        }
        else{
            input.guide = false;
        };
    };//mouseenter and leave
    //states and settings
    $scope.power = false;//changes with checkbox
    $scope.playing = false;//prevents strict while playing
    $scope.strict = false;//strict mode
    $scope.showingDemo = false;//game is in demo mode?
    $scope.listening = false;//game is in listen mode?
	var cutDemo = function(){
        if ($scope.showingDemo){//end current demo
            $interval.cancel(play);
            for(var i=0;i<$scope.instrum.xyphone.length;i++){$scope.UnPlay($scope.instrum.xyphone[i])};
            $scope.showingDemo = false;
        };
	}
    $scope.CutPower = function () {
        $scope.listening = false;//end listening
		cutDemo();
        if ($scope.playing){//turn off play button
            $scope.playing = false;
            $scope.count = 0;
        }
        if ($scope.strict){//turn off strict button
            $scope.strict = false;
        }
    };//power off cancel all intervals, timeouts
    $scope.Snape = function () {
        if ($scope.strict == false && $scope.power && !$scope.playing){
            $scope.strict = true;
        }
        else {
            $scope.strict = false;
        }
    };//strict mode
        //  sequence stuff
    $scope.seq = [];
    $scope.playerEntered = [];
    $scope.tempo = 700;
    $scope.count = 0;
    $scope.NewGame = function () {
        $scope.listening = false;//end listening
		cutDemo();
        if ($scope.playing == false && $scope.power){//turn on new game
            $scope.playing = true;
            $scope.NewSeq();
            $scope.count = 0;
            $timeout(function(){$scope.count +=1; $scope.PlaySeq($scope.tempo, $scope.count)},500);//+1 count, start demo in 500
        }
        else {//turn off game, reset count
            $scope.playing = false;
            $scope.count = 0;
        }
    };
    $scope.NewSeq = function () {
        $scope.seq = [];
        for (var i=0;i<20;i++){
            $scope.seq.push(Math.floor(Math.random() * 8));
        }
        //console.log($scope.seq);
    };
    $scope.PlaySeq = function(tempo, num){
            $scope.showingDemo = true;//begin demo
            var i = 0;
            play = $interval(function(){$scope.Play($scope.instrum.xyphone[$scope.seq[i]]); $timeout(function(){$scope.UnPlay($scope.instrum.xyphone[$scope.seq[i]]);i+=1;CheckEnd()},tempo*0.75);},tempo);
                    //interval tempo millseconds: play the seq, unplay it in 75%tempo, increment i, check if i reached num
            var StopSeq = function(){
                    $interval.cancel(play);
            };
            var CheckEnd = function(){
                    if (i == num){
                        StopSeq();$scope.showingDemo = false;$timeout(function(){$scope.Listen()},500);
                    }
            };
    };
    $scope.Play = function(bar){
        //light the corresponding bar
        //play the corresponding tune
        //use this for player input as well
        bar.playing = true;
            //sounds[bar.number].play(); has fast playing no sound issue
        var audio = new Audio(bar.tune);
        audio.play();
    };
    $scope.UnPlay = function(bar){
        bar.playing = false;
    };//turns off light
    $scope.Listen = function (){
        $scope.playerEntered = [];
        $scope.listening = true;
            // turn off  click blocker element
        //console.log("Listening");
        $scope.$watchCollection(
            "playerEntered",
            function( newValue, oldValue ) {
                if(newValue.length > 0){
                //console.log(newValue);
                    if($scope.seq.slice(0,newValue.length).equals(newValue)&& newValue.length == $scope.count){//newvalue is same as seq and reached count
                        $scope.listening = false;
                        $scope.LevelUp();
                    }
                    if(!$scope.seq.slice(0,newValue.length).equals(newValue)){//the moment newvalue isn't same as seq
                        $scope.listening = false;
                        $scope.Failure();
                    }
                }
            }
        );
    };//listening mode
    $scope.Enter = function (bar){
        if ($scope.listening){
            $scope.playerEntered.push(bar.number);
        };
    };
    $scope.Failure = function (){
        //reset entered, prevents string of failures and failurefunctions
        $scope.playerEntered = [];
        //show frowny face
        var placeholder = $scope.count;
        $scope.count = "😞";
        $timeout(function(){$scope.count = placeholder},1500);//scopecount back
        
        if ($scope.strict){
        //if strict mode, newseq, reset count, tempo
            $scope.NewSeq();
            $timeout(function(){$scope.count = 1;$scope.tempo = 700; $scope.PlaySeq($scope.tempo, $scope.count)},1500);//restart demo
        }
        else{
        //else
            $timeout(function(){$scope.PlaySeq($scope.tempo, $scope.count)},1500);//just restart demo in 1500
        }
    };    
    $scope.LevelUp = function (){
        //show happy face
        var placeholder = $scope.count;
        if (placeholder == 20){
        //longer happy face, dance around flash
            $scope.count = "😄";
            $timeout(function(){$scope.count = "Win"},1500);//display in another 1.5sec
            $timeout(function(){$scope.count = "😄"},3000);//display in another 1.5sec
        //if 20 count, newseq, reset count, tempo
            $timeout(function(){$scope.NewGame()},4500);//end game in 4.5
        }
        else{
        $scope.count = "😊";
        $timeout(function(){$scope.count = placeholder},1500);//scopecount back in 1.5sec
        //increment count, tempo
        $timeout(function(){$scope.count +=1;$scope.tempo -=10; $scope.PlaySeq($scope.tempo, $scope.count)},1500);//+1 count, start demo again in 1500
        }
    };
}]);//end of controller
  //end of function
})();