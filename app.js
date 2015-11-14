angular.module("flit", ["ui.router", 'ngResource'])

// CONFIG
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise('/users/new');

    $stateProvider
    // USERS (Register/Login, Phone, Verify Phone)
    // Users#new is handling login and register
    .state('users-new', {
        url: '/users/new',
        templateUrl: "templates/users/new.html",
        controller: "UsersCtrl" // MainCtrl?
    })
        .state('users-enter-phone', {
            url: '/users/enter_phone',
            templateUrl: "templates/users/enter_phone.html",
            controller: "UsersCtrl" // MainCtrl?
        })
        .state('users-verify-phone', {
            url: '/users/verify_phone',
            templateUrl: "templates/users/verify_phone.html",
            controller: "UsersCtrl" // MainCtrl?
        })
    // MESSAGES ROUTES
    // Messages (Index, New, Scheduled, Sent)
    .state('messages-index', {
        url: '/messages',
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

//////////////
// CONTROLLERS
//////////////
.controller('MainCtrl', function($scope) {
    $scope.greeting = "Hello";
})

// USERS CONTROLLER
.controller('UsersCtrl', function($scope, $location) {
    console.log("fooo");
    $scope.user = {};
    // if (currentUser) { $scope.user = User.get(id)}
    $scope.create = function(user) {
        console.log("create user clicked");
        $location.path('/users/enter_phone');
    };

    $scope.login = function(user) {
        console.log("user logged in");
        $location.path('/messages');
    };

    $scope.addPhone = function(phone) {
        console.log("add phone clicked");
        $scope.user.phone_number = phone;
        console.log("phone added to user:", $scope.user);
        $location.path('/users/verify_phone');
    }

    $scope.verifyPhone = function(code) {
        $scope.user.verification_code = code;
        // TODO: HTTP request to API
        console.log("user phone verified:", $scope.user);
        $location.path('/messages');
    };
})

// MESSAGES CONTROLLER
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
        function(data) {
            $scope.gifs = data.data.data
            console.log($scope.gifs);
        },
        function(error) {
            console.log(error);
        })
})

.factory('Message', function($resource) {
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

    // var HOST = "http://jho-api.herokuapp.com";
    // return $resource(HOST + '/messages/:id', {
    //     id: '@id'
    // })

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