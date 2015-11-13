angular.module("flit", ["ui.router"])

// CONFIG
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('messages-index', {
            url: '/',
            templateUrl: "templates/messages/index.html",
            controller: 'MessagesIndexCtrl'
        })

    .state('messages-show', {
        url: '/messages/:message_id',
        templateUrl: "templates/messages/show.html",
        controller: 'MessagesShowCtrl'
    })
    .state('messages-scheduled', {
      url: '/api/messages/scheduled',
      templateUrl: "templates/messages/scheduled.html",
      controller: 'MessagesScheduledCtrl'
    })
})


// CONTROLLERS
.controller('MainCtrl', function($scope) {
    $scope.greeting = "Hello";
})

.controller('MessagesIndexCtrl', function($scope, Message) {

    $scope.messages = Message.all();

    $scope.scheduleMessage = function(message) {
        console.log("New:", message);
        $scope.newMessage = {};
        message.id = $scope.messages.length + 2;
        console.log("new w/ id:", message);
        // message.id = $scope.message_id;
        $scope.messages.push(message);
    }
})

.controller('MessagesScheduledCtrl', function($scope, Message, $stateParams) {
  $scope.messages = Message.all();

  $scope.deleteMessage = function() {
    // delete message here using $stateParams.id
    console.log("deleteMessage button clicked");
  }
})

.controller('MessagesShowCtrl', function($scope, $stateParams, Message, $http) {
    $scope.message = Message.get($stateParams.message_id);
    console.log($scope.message);
    // TODO: Extract data to service so it isn't being handled by controller
    // TODO: QUERY DB w/ params for Message
    var url = 'http://api.giphy.com/v1/gifs/search?q=dog&api_key=dc6zaTOxFJmzC';
    $http.get(url).then(
      function(data){
        $scope.gifs = data.data.data
        console.log($scope.gifs);
      },
      function(error) {
        console.log(error);
      })
})

.factory('Message', function() {
    var messages = [{
        id: 1,
        to: 8675309,
        from: 1234567,
        body: "Hey buddy",
        sent: false
    }, {
        id: 3,
        to: 1234567,
        from: 8675309,
        body: "Great job dude",
        sent: false
    }];

    return {
      all: function() {
        return messages;
      },
      remove: function(messageId) {
        messages.splice(messages.indexOf(messageId), 1);
      },
      get: function(messageId) {
        var foundMessage;
        messages.forEach(function(message) {
          if (message.id == messageId) {
            console.log(message)
            foundMessage = message;
          }
        });
        return foundMessage;
      }
    }
})