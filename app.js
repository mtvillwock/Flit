angular.module("flit", [])

.controller('MainCtrl', function ($scope) {
  $scope.message = "Hello";

  $scope.messages = [
  { to: 8675309, from: 1234567, body: "Hey buddy"},
  { to: 8675309, from: 1234567, body: "Wat?"},
  { to: 1234567, from: 8675309, body: "Great job dude"},
  { to: 1234567, from: 8675309, body: "Hey!"},
  ];

})