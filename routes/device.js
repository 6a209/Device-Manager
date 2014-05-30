var device = require('../models/device.js');

exports.add = function(req, res){
    device.save(req.body, function(err){
        device.find({}, function(err, obj){
            res.render('index', { title: 'Device Manager', list: obj});
        });
    });
};

exports.edit = function(req, res){
    device.update(req.params.id, req.body, function(err){
        device.find({}, function(err, obj){
            console.log("====");
            res.render('index', { title: 'Device Manager', list: obj});
        });
    });
};

exports.del = function(req, res){
    device.del(req.params.id, function(err){
        console.log(err);
        if(!err){
            console.log("----");
            device.find({}, function(err, obj){
                console.log(obj);
                res.render('index', { title: 'Device Manager', list: obj});
            });
        }
    });
};

