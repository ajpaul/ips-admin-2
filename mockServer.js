/**
 * Created by sxd15 on 8/22/2016.
 */

/**
 * Module dependencies.
 */
var express = require('express'),
    mockApi = require('mock-json-api'),
    fs = require('fs');

var app = express();

var mockRoutes = [];
var mocks = fs.readdirSync(__dirname + '/mocks'); // jshint ignore:line

for (var i in mocks) {
    var mock = mocks[i];
    var template = require(__dirname + '/mocks/' + mock);// jshint ignore:line
    for (var ii in template.mocks) {
        mockRoutes.push(template.mocks[ii]);
    }
}

var mockapi = mockApi({
    jsonStore: __dirname + '/store.json',
    mockRoutes: mockRoutes
});

app.use(mockapi.registerRoutes);

//Listen via http
app.listen(3080, function(){
    console.log('Express server listening on port 3080');
});