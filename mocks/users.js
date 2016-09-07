/**
 * Created by sxd15 on 8/23/2016.
 */

var mocks = [];

var GetResults = {
    name: 'GetResults',
    mockRoute: '\/api\/user\/orgID\/.*', //a regex for the route, ex. '\/api\/steps\/.*\/users' is a valid route
    testScope: 'success', //success=200 & a scenario response | notFound=404 | error=500 and there's many more...
    testScenario: 'multipleResults',  //change this to one of hte scenario names below and restart the mock server to get new data
    latency: '500-3000', //add this line ot implement 1-5 seconds of random latency per call
    jsonTemplate: [
        {
            //you can use regular javascript to create objects to be served
            singleResult: function () {
                var users = {
                    'result': [
                        {
                            'userID': 1,
                            'organization_ID': 1,
                            'tenant_ID': 1,
                            'userName': 'john.snow@thisemail.com',
                            'email': 'johnsnow@email.com',
                            'givenName': 'John',
                            'surname': 'Snow',
                            'active': true
                        }
                    ],
                    'count': 1,
                    'limit': "null",
                    'offset': "null"
                };
                return JSON.stringify(users);
            }
        },
        {
            //or you can use a built in templatiung engine to quickly generate random data
            multipleResults: function () {
                return '{"result": [' +
                    '{{#repeat 5}}' +
                    '{' +
                    '   "userID": {{@index}},' +
                    '   "organization_ID": {{number 0 10}},' +
                    '   "tenant_ID": {{number 0 3}},' +
                    '   "userName": "{{email}}",' +
                    '   "email": "{{email}}",' +
                    '   "givenName": "{{firstName}}",' +
                    '   "surname": "{{lastName}}",' +
                    '   "active": {{boolean}}' +
                    '\n}' +
                    '{{/repeat}}' +
                    '],' +
                    '"count": 5,' +
                    '"limit": "null",' +
                    '"offset": "null"' + 
                    '}';
            }
        },
        {
            noResults: function () {
                var users = {
                    'result': [],
                    'count': 0,
                    'limit': "null",
                    'offset': "null"
                };
                return JSON.stringify(users);
            }
        }
    ]
};
mocks.push(GetResults);

var UpdateUser = {
    name: 'UpdateUser',
    mockRoute: '\/api\/user', //a regex for the route, ex. '\/api\/steps\/.*\/users' is a valid route
    testScope: 'success', //success=200 & a scenario response | notFound=404 | error=500 and there's many more...
    testScenario: 'singleResult',  //change this to one of hte scenario names below and restart the mock server to get new data
    latency: '500-3000', //add this line ot implement 1-5 seconds of random latency per call
    jsonTemplate: [
        {
            //you can use regular javascript to create objects to be served
            singleResult: function () {
                var users = {
                    'result': [
                        {
                            'userID': 1,
                            'organization_ID': 1,
                            'tenant_ID': 1,
                            'userName': 'john.snow@thisemail.com',
                            'email': 'johnsnow@email.com',
                            'givenName': 'John',
                            'surname': 'Snow',
                            'active': true
                        }
                    ],
                    'count': 1,
                    'limit': "null",
                    'offset': "null"
                };
                return JSON.stringify(users);
            }
        }
    ]
};
mocks.push(UpdateUser);

exports.mocks = mocks;