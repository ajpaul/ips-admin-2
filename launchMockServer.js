/**
 * Created by sxd15 on 8/23/2016.
 */

const mockApi = require('./mockServer.js');

var reset = process.argv[2];
if(reset) {
    var fs = require('fs');
    fs.unlink("./store.json", function (err) {
        mockApi.launch(3080);
    });
} else {
    mockApi.launch(3080);
}