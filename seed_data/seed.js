'use strict';

var cwspaceModel = require('../app/models/cwspace.js');
var seedData = require('./cwspace_seeddata.json');
// var async = require('async');
var Q = require('q');
// console.log(seedData);

var Cwspace = cwspaceModel.Cwspace;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cwspaces', function(err){
    if (err) throw err;
});

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

    // geoCodeRequest(requestString).then(function(data){
    //     console.log("wat up max?");
    // });

    // 3) Take the response and parse it for the latlng information: 
    geoCodeRequest(requestString).then(function(data){
        var latLngObject = {latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng}
        console.log(latLngObject)
        //4) store the response as an array object in the variable, 
        var aspace = new Cwspace({
            cwspace_name:           cwspace.cwspace_name,
            borough:                cwspace.borough,
            neighborhood:           cwspace.neighborhood,
            address:                cwspace.address,
            latlng:                 {latitude: data.results[0].geometry.location.lat, longitude: data.results[0].geometry.location.lng},
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
            amenities:              cwspace.amenities,
            owner:                  cwspace.owner
        });
        // console.log(aspace);
        aspace.save(function(err){
            if (err) return (err);
            console.log('coworking space saving meow');
        });
        // done(null, "coworking space saved") ONLY NECESSARY IF I WERE USING ASYNC
    });

};

//Geocoding function ends here.

seedData.forEach(geocoding);

// async.eachSeries(seedData, geocoding, function(err, result){
//     if (err) { console.log(err)};
//     else {
//         console.log(result);
//     }
// })

//BELOW IS THE JSON RESPONSE OBJECT FROM THE GOOGLE GEOCODING API

// {
//    "results" : [
//       {
//          "address_components" : [
//             {
//                "long_name" : "50",
//                "short_name" : "50",
//                "types" : [ "street_number" ]
//             },
//             {
//                "long_name" : "Harrison Street",
//                "short_name" : "Harrison St",
//                "types" : [ "route" ]
//             },
//             {
//                "long_name" : "Hoboken",
//                "short_name" : "Hoboken",
//                "types" : [ "locality", "political" ]
//             },
//             {
//                "long_name" : "Hudson County",
//                "short_name" : "Hudson County",
//                "types" : [ "administrative_area_level_2", "political" ]
//             },
//             {
//                "long_name" : "New Jersey",
//                "short_name" : "NJ",
//                "types" : [ "administrative_area_level_1", "political" ]
//             },
//             {
//                "long_name" : "United States",
//                "short_name" : "US",
//                "types" : [ "country", "political" ]
//             },
//             {
//                "long_name" : "07030",
//                "short_name" : "07030",
//                "types" : [ "postal_code" ]
//             }
//          ],
//          "formatted_address" : "50 Harrison Street, Hoboken, NJ 07030, USA",
//          "geometry" : {
//             "location" : {
//                "lat" : 40.7373655,
//                "lng" : -74.0429188
//             },
//             "location_type" : "ROOFTOP",
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 40.73871448029149,
//                   "lng" : -74.04156981970849
//                },
//                "southwest" : {
//                   "lat" : 40.73601651970849,
//                   "lng" : -74.04426778029151
//                }
//             }
//          },
//          "types" : [ "street_address" ]
//       }
//    ],
//    "status" : "OK"
// }