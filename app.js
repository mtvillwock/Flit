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
})


// CONTROLLERS
.controller('MainCtrl', function($scope) {
    $scope.greeting = "Hello";
})

.controller('MessagesIndexCtrl', function($scope) {
    $scope.message_id = 0;

    $scope.messages = [{
        id: 1,
        to: 8675309,
        from: 1234567,
        body: "Hey buddy"
    }, {
        id: 2,
        to: 8675309,
        from: 1234567,
        body: "Wat?"
    }, {
        id: 3,
        to: 1234567,
        from: 8675309,
        body: "Great job dude"
    }, {
        id: 4,
        to: 1234567,
        from: 8675309,
        body: "Hey!"
    }, ];

    $scope.scheduleMessage = function(message) {
        console.log("New:", message);
        $scope.newMessage = {};
        message.id = $scope.messages.length+2;
        console.log("new w/ id:", message);
        // message.id = $scope.message_id;
        $scope.messages.push(message);
    }

})

.controller('MessagesShowCtrl', function($scope, $stateParams) {
    $scope.message_id = $stateParams.message_id;
    // TODO: Extract data to service so it isn't being handled by controller
    // TODO: QUERY DB w/ params for Message
    $scope.message = {
        id: $scope.message_id,
        to: 1234567,
        from: 8675309,
        body: "Great job dude"
    }
})