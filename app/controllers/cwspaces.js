'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Cwspace = mongoose.model('Cwspace'),
    _ = require('lodash');


/**
 * Find cwspace by id
 */
exports.cwspace = function(req, res, next, id) {
    Cwspace.load(id, function(err, cwspace) {
        if (err) return next(err);
        if (!cwspace) return next(new Error('Failed to load cwspace ' + id));
        req.cwspace = cwspace;
        next();
    });
};

// /**
//  * Show an cwspace
//  */
exports.show = function(req, res) {
    res.jsonp(req.cwspace);
};

/**
 * List of cwspaces
 */
exports.all = function(req, res){
    Cwspace.find({}, function(err, cwspaces){
        res.jsonp(cwspaces);
    });
};

// Alternatively: 
// exports.all = function(req, res) {
//     Cwspace.find().sort('-cwspace_name').exec(function(err, cwspaces) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             res.jsonp(cwspaces);
//         }
//     });
// };




// /**
//  * Create an cwspace
//  */
// exports.create = function(req, res) {
//     var cwspace = new Cwspace(req.body);
//     // cwspace.user = req.user;

//     cwspace.save(function(err) {
//         if (err) {
//             return (err);
//             });
//         } else {
//             res.jsonp(cwspace);
//         }
//     });
// };

// /**
//  * Update an cwspace
//  */
// exports.update = function(req, res) {
//     var cwspace = req.cwspace;

//     cwspace = _.extend(cwspace, req.body);

//     cwspace.save(function(err) {
//         if (err) {
//             return (err)
//             });
//         } else {
//             res.jsonp(cwspace);
//         }
//     });
// };

// /**
//  * Delete an cwspace
//  */
// exports.destroy = function(req, res) {
//     var cwspace = req.cwspace;

//     cwspace.remove(function(err) {
//         if (err) {
//             return res.send({
//                 errors: err.errors,
//                 cwspace: cwspace
//             });
//         } else {
//             res.jsonp(cwspace);
//         }
//     });
// };



