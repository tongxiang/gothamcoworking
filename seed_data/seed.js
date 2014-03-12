var cwspaceModel = require('../app/models/cwspace.js');
var seedData = require('./cwspace_seeddata.json');

// console.log(seedData);

var Cwspace = cwspaceModel.Cwspace;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cwspaces', function(err){
    if (err) throw err;
});

console.log('Inserting coworking space data');

seedData.forEach(function(coworkingspace){
    var aspace = new Cwspace({
        cwspace_name: coworkingspace.cwspace_name,
        borough: coworkingspace.borough,
        neighborhood: coworkingspace.neighborhood,
        address: coworkingspace.address,
        latlng: coworkingspace.latlng, //I need to bring in the google maps API later
        floor_suite_or_room: coworkingspace.floor_suite_or_room,
        pricing: coworkingspace.pricing,
        membership_startupfees: coworkingspace.membership_startupfees,
        oneperson_dailyrate: coworkingspace.oneperson_dailyrate,
        oneperson_shareddesk_monthlyrate: coworkingspace.oneperson_shareddesk_monthlyrate,
        oneperson_dedicateddesk_monthlyrate: coworkingspace.oneperson_dedicateddesk_monthlyrate,
        grouptablecluster_monthlyrate: coworkingspace.grouptablecluster_monthlyrate,
        grouptablecluster_capacity: coworkingspace.grouptablecluster_capacity,
        office_monthlyrate: coworkingspace.office_monthlyrate,
        office_capacity: coworkingspace.office_capacity,
        twitter: coworkingspace.twitter,
        phone: coworkingspace.phone,
        email: coworkingspace.email,
        websiteurl: coworkingspace.websiteurl,
        logo_filename: coworkingspace.logo_filename,
        interiorphoto_filename: coworkingspace.interiorphoto_filename,
        description: coworkingspace.description,
        amenities: coworkingspace.amenities,
        owner: coworkingspace.owner
    });
    // console.log(aspace);
    aspace.save(function(err){
        if (err) return (err);
        console.log("coworking space saving meow");
    });
    // console.log(aspace);
});