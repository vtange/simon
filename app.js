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
    $scope.on = false;
    $scope.showingDemo = false;
    
    
    
    
    
    
    
    
}]);//end of controller
  //end of function
})();