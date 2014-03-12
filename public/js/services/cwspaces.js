'use strict';

//Articles service used for articles REST endpoint
angular.module('gothamcoworking.cwspaces').factory('Cwspaces', ['$resource', function($resource) {
    return $resource('cwspaces/:cwspaceId', {
        cwspaceId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);