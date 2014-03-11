// 'use strict';

var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/cwspaces');

var Schema = mongoose.Schema;

var CwspaceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    cwspace_name: String,
    borough: String,
    neighborhood: String,
    address: String,
    latlng: [Number, Number],
    floor_suite_or_room: String,
    pricing: String,
    membership_startupfees: String,
    oneperson_dailyrate: Number,
    oneperson_shareddesk_monthlyrate: Number,
    oneperson_dedicateddesk_monthlyrate: Number,
    grouptablecluster_monthlyrate: Number,
    grouptablecluster_capacity: Number,
    office_monthlyrate: Number,
    office_capacity: String,
    twitter: String,
    phone: String,
    email: String,
    websiteurl: String,
    logo_filename: String,
    interiorphoto_filename: String,
    description: String,
    amenities: String,
    owner: String
});

exports.Cwspace = mongoose.model('Cwspace', CwspaceSchema);