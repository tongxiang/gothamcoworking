'use strict';

var mongoose = require('mongoose');

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
    latlng: {latitude: Number, longitude: Number},
    geo: {type: [Number], index: '2d'},
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
    generic_description: String,
    amenities: String,
    owner: String
});

CwspaceSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

// CwspaceSchema.methods.findNear = function(cb) {
//     return this.model('CwspaceSchema').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01}}, cb);
// };

exports.Cwspace = mongoose.model('Cwspace', CwspaceSchema);