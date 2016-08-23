/**
 * Created by sxd15 on 8/23/2016.
 */

var mocks = [];

var GetResults = {
    name: 'GetResults',
    mockRoute: 'users',
    testScope: 'success', //success | fail | error
    testScenario: 'noResults',
    jsonTemplate: [
        {
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