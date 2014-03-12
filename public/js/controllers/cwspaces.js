'use strict';

angular.module('gothamcoworking.cwspaces').controller('CwspacesController', ['$scope', '$stateParams', '$location', 'Global', 'Cwspaces', function ($scope, $stateParams, $location, Global, Cwspaces) {
    $scope.global = Global;

    $scope.create = function() {
        var cwspace = new Cwspaces({
            title: this.title,
            content: this.content
        });
        cwspace.$save(function(response) {
            $location.path('cwspaces/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(cwspace) {
        if (cwspace) {
            cwspace.$remove();

            for (var i in $scope.cwspaces) {
                if ($scope.cwspaces[i] === cwspace) {
                    $scope.cwspaces.splice(i, 1);
                }
            }
        }
        else {
            $scope.cwspace.$remove();
            $location.path('cwspaces');
        }
    };

    $scope.update = function() {
        var cwspace = $scope.cwspace;
        if (!cwspace.updated) {
            cwspace.updated = [];
        }
        cwspace.updated.push(new Date().getTime());

        cwspace.$update(function() {
            $location.path('cwspaces/' + cwspace._id);
        });
    };

    $scope.find = function() {
        console.log("cwspaces controller running find() function right now")
        $scope.cwspaces = Cwspaces.query(function() {
            console.log("inside the query function right now")
            // $scope.cwspaces = cwspaces;
            // console.log(cwspaces)
        });
    };

    $scope.findOne = function() {
        Cwspaces.get({
            cwspaceId: $stateParams.cwspaceId
        }, function(cwspace) {
            $scope.cwspace = cwspace;
        });
    };
}]);