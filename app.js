(function() {
    //start of function
  var app = angular.module('Simon', []);

app.factory('memory', function($http){

  var baseUrl = "http://www.freecodecamp.com/news/hot/";

  var storage = {};
 storage.datadata = [];

    $http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
    $http.jsonp(baseUrl + "?callback=JSON_CALLBACK").success(function(data1) {

        storage.datadata = data1;

     }).error(function(data1) {
        storage.datadata = [];
        console.log("error0");
     });
    }//end info pulling

  return storage;
});//end of service

app.controller('MainCtrl', ['$scope', 'memory', function($scope, memory){
    $scope.storage = memory; // load service

}]);//end of controller
  //end of function
})();
