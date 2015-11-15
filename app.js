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
    $scope.hinting = function (input) {
            return { "box-shadow": input.color }
    };
    $scope.ShowGuide = function (input) {
        if (!input.guide) {
            input.guide = true;
        }
        else{
            input.guide = false;
        };
    };
    //states and settings
    $scope.power = false;//changes with checkbox
    $scope.playing = false;
    $scope.strict = false;
    $scope.showingDemo = false;
    $scope.listening = false;
    $scope.CutPower = function () {
        $scope.listening = false;//end listening
        if ($scope.showingDemo){//end current demo
            $timeout.cancel(EndSeq);
            $interval.cancel(play);
            $interval.cancel(stopplay);
            for(var i=0;i<$scope.instrum.xyphone.length;i++){$scope.UnPlay($scope.instrum.xyphone[$scope.seq[i]])};
            $scope.showingDemo = false;
        };
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
        if ($scope.showingDemo){//end current demo
            $timeout.cancel(EndSeq);
            $interval.cancel(play);
            $interval.cancel(stopplay);
            for(var i=0;i<$scope.instrum.xyphone.length;i++){$scope.UnPlay($scope.instrum.xyphone[$scope.seq[i]])};
            $scope.showingDemo = false;
        };
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
        console.log($scope.seq);
    };
    $scope.PlaySeq = function(tempo, num){
            $scope.showingDemo = true;//begin demo
            var i = 0;
            play = $interval(function(){$scope.Play($scope.instrum.xyphone[$scope.seq[i]])},500);
            stopplay = $interval(function(){$scope.UnPlay($scope.instrum.xyphone[$scope.seq[i]]);i+=1},500+tempo);
            var StopSeq = function(){
                    $interval.cancel(play);
                    $interval.cancel(stopplay);
            };
            EndSeq = $timeout(function(){StopSeq();$scope.showingDemo = false;$timeout(function(){$scope.Listen()},500);},(500+tempo)*num);//end demo, start listen phase in 500
    };
    $scope.Play = function(bar){
        //light the corresponding bar
        //play the corresponding tune
        //use this for player input as well
        bar.playing = true;
    };
    $scope.UnPlay = function(bar){
        bar.playing = false;
    };
    $scope.Listen = function (){
        $scope.playerEntered = [];
        $scope.listening = true;
            // turn off  click blocker element
        console.log("Listening");
        $scope.$watchCollection(
            "playerEntered",
            function( newValue, oldValue ) {
                if(newValue.length > 0){
                console.log(newValue);
                console.log($scope.seq.slice(0,newValue.length));
                    if($scope.seq.slice(0,newValue.length).equals(newValue)&& newValue.length == $scope.count){
                        $scope.listening = false;
                        console.log("success");//run sucess function
                        $scope.LevelUp();
                    }
                    if(!$scope.seq.slice(0,newValue.length).equals(newValue)){
                        $scope.listening = false;
                        console.log("failure");//run failure function
                        $scope.Failure();
                    }
                }
            }
        );
        
        //if timeout or fail, show frown, delay, PlaySeq(current tempo, num)
        
        
        
        
        //if sucess, show happy, delay, PlaySeq(num+1);
    };
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
        $scope.count = "😊";
        
        if ($scope.count == 20){
        //longer happy face, dance around flash
            $timeout(function(){$scope.count = "😄"},1500);//display in 1.5sec
            $timeout(function(){$scope.count = "Win"},3000);//display in another 1.5sec
            $timeout(function(){$scope.count = "😄"},4500);//display in another 1.5sec
            $timeout(function(){$scope.count = "Win"},6000);//display in another 1.5sec
        //if 20 count, newseq, reset count, tempo
            $timeout(function(){$scope.count = placeholder},7500);//scopecount back in 7.5
            $scope.NewSeq();
            $timeout(function(){$scope.count = 1;$scope.tempo = 700; $scope.PlaySeq($scope.tempo, $scope.count)},7500);//restart demo in 7.5 sec
        }
        else{
        $timeout(function(){$scope.count = placeholder},1500);//scopecount back in 1.4sec
        //increment count, tempo
        $timeout(function(){$scope.count +=1;$scope.tempo -=25; $scope.PlaySeq($scope.tempo, $scope.count)},1500);//+1 count, start demo again in 1500
        }
    };

    
    
    
/*
      // Play audio
      var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
      var audio = new Audio(wav);
			audio.play();
      
      */
}]);//end of controller
  //end of function
})();