'use strict';

//Setting up route
angular.module('gothamcoworking').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all cwspaces', {
        url: '/cwspaces',
        templateUrl: 'views/cwspaces/list.html'
    })
      .state('create cwspace', {
        url: '/cwspaces/create',
        templateUrl: 'views/cwspaces/create.html'
    })
      .state('edit cwspace', {
        url: '/cwspaces/:cwspaceId/edit',
        templateUrl: 'views/cwspaces/edit.html'
    })
      .state('cwspace by id', {
        url: '/cwspaces/:cwspaceId',
        templateUrl: 'views/cwspaces/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('gothamcoworking').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
