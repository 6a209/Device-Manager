
/*
 * GET home page.
 */

var device = require('../models/device.js');

exports.index = function(req, res){
    device.find({}, function(err, obj){
        res.render('index', { title: 'Device Manager', list: obj});
    });
};
