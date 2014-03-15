'use strict';

var cwspaceModel = require('../app/models/cwspace.js');
var seedData = require('./cwspace_seeddata.json');
var async = require('async');
// console.log(seedData);

var Cwspace = cwspaceModel.Cwspace;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cwspaces', function(err){
    if (err) throw err;
});

var request = require('request');

console.log('Inserting coworking space data');

    var geocoding = function(cwspace, done){

    //Function that queries the google maps geocoding API: 

    //1) encodes the JSON address from cwspace_seeddata.json as the appropriate string

    var plussifiedAddress = cwspace.address + "+" + cwspace.neighborhood + "+" + cwspace.borough;

    var requestString = "https://maps.googleapis.com/maps/api/geocode/json?address=" + plussifiedAddress + "&sensor=false&key=YOURAPIKEYHERE";

    request(requestString, function(error, response, body){
        if (!error && response.statusCode == 200){
            var myJSONResult = body;
            console.log(myJSONResult);
        };
    });

    //2) sends a request to the geocoding API, something along the lines of below: 

    //How can this request be made? It should be an HTTPS request. I should use the Request npm library to make requests

    //Note that this request probably will happen asynchronously, and so I'll probably need some kind of promise object for this asynchronous request--Request actually works using callbacks

    //https://github.com/mikeal/request

    //3) Take the response and parse it for the latlng information: 
    var latLngArray = [myJSONResult.results.geometry.location.lat, myJSONResult.results.geometry.location.lng]

//4) store the response as an array object in the variable, 

//later, within the new Cwspace object, we assign the variable to the object 

    var aspace = new Cwspace({
        cwspace_name: cwspace.cwspace_name,
        borough: cwspace.borough,
        neighborhood: cwspace.neighborhood,
        address: cwspace.address,
        latlng: latLngArray, 
        floor_suite_or_room: cwspace.floor_suite_or_room,
        pricing: cwspace.pricing,
        membership_startupfees: cwspace.membership_startupfees,
        oneperson_dailyrate: cwspace.oneperson_dailyrate,
        oneperson_shareddesk_monthlyrate: cwspace.oneperson_shareddesk_monthlyrate,
        oneperson_dedicateddesk_monthlyrate: cwspace.oneperson_dedicateddesk_monthlyrate,
        grouptablecluster_monthlyrate: cwspace.grouptablecluster_monthlyrate,
        grouptablecluster_capacity: cwspace.grouptablecluster_capacity,
        office_monthlyrate: cwspace.office_monthlyrate,
        office_capacity: cwspace.office_capacity,
        twitter: cwspace.twitter,
        phone: cwspace.phone,
        email: cwspace.email,
        websiteurl: cwspace.websiteurl,
        logo_filename: cwspace.logo_filename,
        interiorphoto_filename: cwspace.interiorphoto_filename,
        description: cwspace.description,
        amenities: cwspace.amenities,
        owner: cwspace.owner
    });
    // console.log(aspace);
    aspace.save(function(err){
        if (err) return (err);
        console.log("coworking space saving meow");
    });
    done(null, "coworking space saved")
});

async.eachSeries(seedData, geocoding, function(err, result){
    if (err) { console.log(err)};
    else {
        console.log(result);
    }
})

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