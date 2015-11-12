angular.module("flit", ["ui.router"])

// CONFIG
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: "templates/messages/index.html",
      controller: 'MessagesIndexCtrl'
    })
})


// CONTROLLERS
.controller('MainCtrl', function ($scope) {
  $scope.greeting = "Hello";
})

.controller('MessagesIndexCtrl', function ($scope) {


$scope.messages = [
  { to: 8675309, from: 1234567, body: "Hey buddy"},
  { to: 8675309, from: 1234567, body: "Wat?"},
  { to: 1234567, from: 8675309, body: "Great job dude"},
  { to: 1234567, from: 8675309, body: "Hey!"},
  ];

  $scope.scheduleMessage = function(message) {
    console.log(message);
    $scope.newMessage = {};
    $scope.messages.push(message);
  }

})