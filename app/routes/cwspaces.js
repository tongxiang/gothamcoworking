'use strict';

// cwspaces routes use cwspaces controller
var cwspaces = require('../controllers/cwspaces');
// var authorization = require('./middlewares/authorization');

// cwspace authorization helpers
// var hasAuthorization = function(req, res, next) {
//     if (req.cwspace.user.id !== req.user.id) {
//         return res.send(401, 'User is not authorized');
//     }
//     next();
// };

module.exports = function(app) {

    app.get('/cwspaces/longitudelatitude', cwspaces.nearPlaces);

    app.get('/cwspaces', cwspaces.all);
    // app.post('/cwspaces', cwspaces.create);
    app.get('/cwspaces/:cwspaceId', cwspaces.show);
    // app.put('/cwspaces/:cwspaceId', cwspaces.update);
    // app.del('/cwspaces/:cwspaceId', cwspaces.destroy);

    // Finish with setting up the cwspaceId param
    app.param('cwspaceId', cwspaces.cwspace); //listening for anything passed into the URLs as the Id, and then we're running the cwspaces.cwspace function

};



// app.param('lngLat', cwspaces.findByLocation);

//but how will Express differentiate between whether or not I'm passing in a lngLat and a cwspaceId? How will it know which param to run?

//Do I need to make another service? 

