
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var device = require('./routes/device');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var log4js = require('log4js');


// log4js config

log4js.configure({
    appenders: [
        {type: 'console'},
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups: 3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO, format:':method :url'}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// 添加设备
app.post('/device/add', device.add);

// 修改设备 
app.post('/device/edit/:id', device.edit);

// 删除设备
app.get('/device/del/:id', device.del);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// export logger
exports.logger=function(name){
      var logger = log4js.getLogger(name);
        logger.setLevel('INFO');
          return logger;
}
