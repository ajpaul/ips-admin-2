/**
 * Created by sxd15 on 8/23/2016.
 */

var mocks = [];

var GetResults = {
    name: 'GetResults',
    mockRoute: 'users', //a regex for the route, ex. '\/api\/steps\/.*\/users' is a valid route
    testScope: 'success', //success=200 & a scenario response | notFound=404 | error=500 and there's many more...
    testScenario: 'multipleResults',  //change this to one of hte scenario names below and restart the mock server to get new data
    //latency: '1000-5000', //add this line ot implement 1-5 seconds of random latency per call
    jsonTemplate: [
        {
            //you can use regular javascript to create objects to be served
            singleResult: function () {
                var users = {'data': [
                    {
                        'displayName': 'User 1',
                        'displayEmail': 'user1@email.com',
                        'bookmarked': false
                    }]};
                return JSON.stringify(users);
            }
        },
        {
            //or you can use a built in templatiung engine to quickly generate random data
            multipleResults: function () {
                return '{"data": [{{#repeat 180}}' +
                    '{' +
                    '   "displayName":"{{company}}",' +
                    '   "displayEmail":"{{company}}@{{company}}.com",' +
                    '   "bookmarked":"{{boolean}}"' +
                    '} {{/repeat}}' +
                    ']}';
            }
        },
        {
            noResults: function () {
                var users = {'data': []};
                return JSON.stringify(users);
            }
        }
    ]
};
mocks.push(GetResults);
exports.mocks = mocks;