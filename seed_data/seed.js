'use strict';

var cwspaceModel = require('../app/models/cwspace.js');
var seedData = require('./cwspace_seeddata.json');
// var async = require('async');
var Q = require('q');
// console.log(seedData);

var Cwspace = cwspaceModel.Cwspace;

var mongoose = require('mongoose');
mongoose.connect("mongodb://heroku_app23270994:jamrieh6p4j1f53laklb2g2gb@dbh70.mongolab.com:27707/heroku_app23270994", function(err){
    if (err) throw err;
});

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/cwspaces', function(err){
//     if (err) throw err;
// });

var request = require('request');


//Function that queries the google maps geocoding API: 
var geocoding = function(cwspace){
    console.log('Inserting coworking space data');

    //1) encodes the JSON address as the appropriate string

    var plussifiedAddress = cwspace.address.split(" ").join("+") + "+" + cwspace.neighborhood.split(" ").join("+") + "+" + cwspace.borough.split(" ").join("+");

    var requestString = "https://maps.googleapis.com/maps/api/geocode/json?address=" + plussifiedAddress + "&sensor=false&key=AIzaSyC8WAWkIoWFjCMf8AT5SbTBz0keuxlubDY";
        console.log(requestString);
    //2) sends a request to the geocoding API
    var geoCodeRequest = function(url){
        var deferred = Q.defer();
        request.get(url, function(error, response, data){
            if (!error){
                var googleResponse = JSON.parse(data);
                // console.log(googleResponse);
                deferred.resolve(googleResponse);
            } else{
                deferred.reject("there was an error!"+" Status code: "+data.status + error);
            }
        });
        return deferred.promise;
    };

    // 3) Take the response and parse it for the latlng information: 
    geoCodeRequest(requestString).then(function(data){
        var latLngObject = {latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng}
        console.log(latLngObject)
        //4) store the response as an array object in the variable, 
        var aspace = new Cwspace({
            cwspace_name:           cwspace.cwspace_name,
            borough:                cwspace.borough,
            neighborhodod:           cwspace.neighborhood,
            address:                cwspace.address,
            latlng:                 {latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng},
            geo:                    [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat],
            floor_suite_or_room:    cwspace.floor_suite_or_room,
            pricing:                cwspace.pricing,
            membership_startupfees: cwspace.membership_startupfees,
            oneperson_dailyrate:    cwspace.oneperson_dailyrate,
            oneperson_shareddesk_monthlyrate: 
                                    cwspace.oneperson_shareddesk_monthlyrate,
            oneperson_dedicateddesk_monthlyrate: 
                                    cwspace.oneperson_dedicateddesk_monthlyrate,
            grouptablecluster_monthlyrate: 
                                    cwspace.grouptablecluster_monthlyrate,
            grouptablecluster_capacity:
                                    cwspace.grouptablecluster_capacity,
            office_monthlyrate:     cwspace.office_monthlyrate,
            office_capacity:        cwspace.office_capacity,
            twitter:                cwspace.twitter,
            phone:                  cwspace.phone,
            email:                  cwspace.email,
            websiteurl:             cwspace.websiteurl,
            logo_filename:          cwspace.logo_filename,
            interiorphoto_filename: cwspace.interiorphoto_filename,
            description:            cwspace.description,
            generic_description:    cwspace.generic_description,
            amenities:              cwspace.amenities,
            owner:                  cwspace.owner
        });
        aspace.save(function(err){
            if (err) return (err);
            console.log('coworking space saving meow');
        });
    });

};

//Geocoding function ends here.

seedData.forEach(geocoding);
