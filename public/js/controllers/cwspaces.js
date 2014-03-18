'use strict';

angular.module('gothamcoworking.cwspaces').controller('CwspacesController', ['$scope', '$stateParams', '$location', 'Global', 'Cwspaces', function ($scope, $stateParams, $location, Global, Cwspaces) {
    $scope.global = Global;

    $scope.query = "";

    $scope.map = {
        center: {
            latitude: 40.7500, 
            longitude: -73.940
        }, 
        zoom: 11
    };
    

    $scope.redirectFunction = function(query){
        $location.path('/search/'+query);
    }

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
        $scope.cwspaces = Cwspaces.query(function() {
            $scope.query = $stateParams.searchParams;
            console.log($scope.query);
            // $scope.cwspaces = cwspaces;
            // console.log(cwspaces)
        });
    };

    $scope.findOne = function() {
        Cwspaces.get({
            cwspaceId: $stateParams.cwspaceId
        }, function(returnedCwspace) {
            $scope.cwspace = returnedCwspace;
        });
    };

    $scope.findOne = function() {
        $scope.cws = {};
        $scope.cws.latlng = {longitude: 0, latitude: 0};
        $scope.cwspace = Cwspaces.get({
            cwspaceId: $stateParams.cwspaceId
        }, function() {
            $scope.cws.latlng = $scope.cwspace.latlng;

        });
    };

}]);