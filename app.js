angular.module("flit", [])

.controller('MainCtrl', function ($scope) {
  $scope.message = "Hello";

  $scope.messages = ["Foo", "Bar", "Baz", "Sweet", "Cool", "Swag"];

})