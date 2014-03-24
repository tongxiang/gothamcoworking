'use strict';

angular.module('gothamcoworking.cwspaces').controller('CwspacesController', ['$scope', '$stateParams', '$location', 'Global', 'Cwspaces', '$http', function ($scope, $stateParams, $location, Global, Cwspaces, $http) {
    $scope.global = Global;

    $scope.query = "";
    $scope.address ="";
    $scope.details;

    $scope.map = {
        center: {
            latitude: 40.7500, 
            longitude: -73.940
        }, 
        zoom: 11
    };

    // $scope.redirectFunction = function(query){
    //     $location.path('/search/'+query);
    // }

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
        });
    };

    $scope.locationSearch = function(){
        // console.log("we're in location search");
        // var objectLngLat = {longitude: $scope.details.geometry.location.A, latitude: $scope.details.geometry.location.k};
        var stringLngLat = $scope.details.geometry.location.A + "," + $scope.details.geometry.location.k;
        // console.log(stringLngLat);
        $http({method: 'GET', url: '/cwspaces/longitudelatitude', params: {lngLat: stringLngLat}}).
            success(function(data, status, headers, config){
                console.log(data);
                $scope.cwspaces = data;
            }). 
            error(function(data, status, headers, config){
                console.log(status);
            });

        //we run a .get request on the Cwspaces service, while passing in the longlat object {}

        //And then finally, the Mongo query returns an array of coworking spaces. We modify the $scope.cwspaces with what it returned 

    };

    // $scope.findOne = function() {
    //     Cwspaces.get({
    //         cwspaceId: $stateParams.cwspaceId
    //     }, function(returnedCwspace) {
    //         $scope.cwspace = returnedCwspace;
            
    //     });
    // };

    $scope.findOne = function() {
        $scope.cws = {};
        $scope.cws.latlng = {longitude: 0, latitude: 0};
        $scope.cwspace = Cwspaces.get({
            cwspaceId: $stateParams.cwspaceId
        }, function() {
            $scope.cws.latlng = $scope.cwspace.latlng;

            if ($scope.cwspace.generic_description){
                $scope.AlleyWatch = false;
            }
            else {
                $scope.AlleyWatch = true;
            }

        });
    };

}]);