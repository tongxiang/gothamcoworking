'use strict';

angular.module('gothamcoworking.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Cwspaces',
        'link': 'cwspaces'
    }, {
        'title': 'Create New Cwspace',
        'link': 'cwspaces/create'
    }];
    
    $scope.isCollapsed = false;
}]);

//Controller for header bar << this has been cleared from the server-side template view, so it shouldn't appear. But it might. 