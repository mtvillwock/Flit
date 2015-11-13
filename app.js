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

    .state('messages-scheduled', {
      url: '/messages/scheduled',
      templateUrl: "templates/messages/scheduled.html",
      controller: 'MessagesScheduledCtrl'
    })
    .state('messages-sent', {
      url: '/messages/sent',
      templateUrl: "templates/messages/sent.html",
      controller: 'MessagesSentCtrl'
    })
    .state('messages-edit', {
      url: '/messages/:message_id/edit',
      templateUrl: "templates/messages/edit.html",
      controller: 'MessagesEditCtrl'
    })
    .state('messages-show', {
        url: '/messages/:message_id',
        templateUrl: "templates/messages/show.html",
        controller: 'MessagesShowCtrl'
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
        // POST /api/messages
        $scope.messages.push(message);
    }
})

.controller('MessagesScheduledCtrl', function($scope, Message, $stateParams) {
  $scope.messages = Message.all();

  $scope.deleteMessage = function() {
    // delete message here using $stateParams.message_id
    // delete /api/messages/:message_id
    console.log("deleteMessage button clicked");
  }

  $scope.sendMessage = function() {
    // ping server API to ping Twilio
    // PUT /api/messages/:message_id (update)
    console.log("sendMessage button clicked");
  }
})

.controller('MessagesSentCtrl', function($scope, Message, $stateParams) {
  $scope.messages = Message.all();

  $scope.deleteMessage = function() {
    // delete message here using $stateParams.id
    // delete /api/messages/:message_id
    console.log("deleteMessage button clicked");
  }
})

.controller('MessagesEditCtrl', function($scope, Message, $stateParams, $location) {
  $scope.message = Message.get($stateParams.message_id);
  console.log($scope.message)

  $scope.updateMessage = function(message) {
        console.log("updated:", message);
        $scope.message = message;
        $scope.editMessage = {};
        console.log(message);
        // TODO:
        // Call to DB to update message
        // PUT /api/messages/:message_id
        // redirect to scheduled
        $location.path('/messages/scheduled');
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