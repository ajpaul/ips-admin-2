/**
 * Created by sxd15 on 8/22/2016.
 */

/**
 * Module dependencies.
 */
var express = require('express'),
    mockApi = require('mock-json-api'),
    fs = require('fs'),
    http = require('http');

var app = express();

// all environments
app.set('port', 3080);// jshint ignore:line

var mockRoutes = [];
var mocks = fs.readdirSync(__dirname + '/mocks'); // jshint ignore:line

for (var i in mocks) {
    var mock = mocks[i];
console.log(mock);
    var template = require(__dirname + '/mocks/' + mock);// jshint ignore:line
console.log(template);
    for (var ii in template.mocks) {
        mockRoutes.push(template.mocks[ii]);
    }
}

var mockapi = mockApi({
    jsonStore: __dirname + '/store.json',
    mockRoutes: mockRoutes
});

app.use(mockapi.registerRoutes);

///HTTP Server
var server = http.createServer(app);

//Listen via http
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});