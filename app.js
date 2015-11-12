(function() {
    //start of function
  var app = angular.module('Simon', []);

app.factory('memory', function(){

  var storage = {};
 storage.datadata = [];

  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', function($scope){
    $scope.storage = memory; // load service

}]);//end of controller
  //end of function
})();
