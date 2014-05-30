var mongodb = require('./mongodb.js');
var Schema = mongodb.mongoose.Schema;
var DeviceSchema = new Schema({
    id : String,
    name: String,
    version: String,
    resolution: String,
    inwho: String,
    time: String,
    desc: String,
    edit: String,
});

var Device = mongodb.mongoose.model("Device", DeviceSchema);
var DeviceDAO = function(){};


var findDeviceById = function(id, callback){
    Device.findById(id, function(err, doc){
        if(err){
            callback(err, null);
        }else{
            callback(null, doc);
        }
    });
};

DeviceDAO.prototype.save = function(obj, callback){
    Device.count(function(err, count){
        obj.id = count;
        var instance = new Device(obj);
        instance.save(function(err){
            callback(err);
        });
    });
};

DeviceDAO.prototype.find = function(obj, callback){
    Device.find({}, function(err, obj){
        callback(err, obj);
    });
};

DeviceDAO.prototype.del = function(id, callback){
    findDeviceById(id, function(err, doc){
        if(err){
            callback(err);
        }else{
            doc.remove();
            callback();
        }
    });
};

DeviceDAO.prototype.update = function(id, obj, callback){
    findDeviceById(id, function(err, doc){
        if(err){
            callback(err);
        }else{
            doc.name = obj.name;
            doc.version = obj.version;
            doc.resoultion = obj.resoultion;
            doc.inwho = obj.inwho;
            doc.time = obj.time;
            doc.desc = obj.desc;
            doc.save(function(err){
                callback(err);
            });
        }
    });
};

module.exports = new DeviceDAO();

