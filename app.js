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
    $scope.power = false;
    $scope.playing = false;
    $scope.strict = false;
    $scope.showingDemo = false;
    $scope.count = 0;
    $scope.OnOff = function () {
        if ($scope.power == false){
            $scope.power = true;
            console.log("On.");
        }
        else {
            $scope.power = false;
        }
    }
    $scope.Play = function () {
        if ($scope.playing == false){
            $scope.playing = true;
            console.log("On.");
        }
        else {
            $scope.playing = false;
        }
    }
    $scope.Snape = function () {
        if ($scope.strict == false){
            $scope.strict = true;
            console.log("On.");
        }
        else {
            $scope.strict = false;
        }
    }
    
    
    
    
    
}]);//end of controller
  //end of function
})();