var dummyJson = require('dummy-json');

var configOptions = [
    'mockRoutes'
];

var routes;

function MockResponse(template){

    var mockRoutes = [];
    for (var ii in template.mocks) {
        mockRoutes.push(template.mocks[ii]);
    }

    routes = mockRoutes;
}

MockResponse.prototype.getResponse = function(req) {
    return this.registerRoutes(req);
};

module.exports = function (mockTemplate) {
    return new MockResponse(mockTemplate);
};

MockResponse.prototype.registerRoutes = function (req) {

    var found = false;

    for (var i = 0; i < routes.length; i++) {
        var matchingMethod = true;

        if(typeof routes[i].method === 'string' || routes[i].method instanceof String){
            matchingMethod = (routes[i].method.toLowerCase() === req.method.toLowerCase());
        }

        var reqInfo = parseUrl(req.url);
        if (reqInfo.path.match(routes[i].mockRoute) !== null && matchingMethod) {

            found = true;

            console.log('MOCK::PATH::'+reqInfo.path);

            var route = routes[i];

            //If scope & scenario is passed via the url; then, overwrite the testScope & testScenario properties
            if (reqInfo.query) {

                var testScope = reqInfo.query.scope;
                if (typeof testScope !== 'undefined') {
                    route.testScope = testScope;
                }

                var testScenario = reqInfo.query.scenario;
                if (typeof testScenario !== 'undefined') {
                    route.testScenario = testScenario;
                }
            }

            var response = _routeResponse(route, req);
            console.log('MOCK::RESPONSE::'+response);
            return response;
        }
    }

    if(!found) {
        return null;  //no routes found, end here!
    }
};

/*
 * PRIVATE METHODS
 * */

function _routeResponse (route, req) {
    var response = null;

    switch (route.testScope) {

        //Simulates a successful response (200) - 10.2.1 200 OK
        case 'success':
            var jsonTemplate = null;
            var dummyOptions = {};

            if (typeof route.jsonTemplate === 'object') {

                /*
                 handle case where testScenario is not defined,
                 default to first testScenario
                 */
                if (!route.testScenario) {
                    route.testScenario = 0;
                }

                /*
                 route.testScenario - can be type function, string, or int
                 */

                // is the testScenario a function
                if (typeof route.testScenario === 'function') {
                    route.testScenario = route.testScenario(req);
                }

                // is the testScenario a string?
                if (typeof route.testScenario === 'string') {
                    var templates = route.jsonTemplate;
                    for (var template in templates) {
                        if (templates[template].hasOwnProperty(route.testScenario)) {
                            jsonTemplate = templates[template][route.testScenario]();
                            break;
                        }
                    }
                }

                // is the testScenario an int?
                if (!isNaN(route.testScenario))
                {
                    var scenario = parseInt(route.testScenario);
                    if (route.jsonTemplate.length > scenario) {
                        jsonTemplate = route.jsonTemplate[scenario]();
                    }
                }

            }

            if (typeof route.jsonTemplate === 'string') {
                jsonTemplate = route.jsonTemplate;
            }

            dummyOptions.data = route.data || {};
            dummyOptions.data.request = req;

            if (route.helpers) {
                dummyOptions.helpers = route.helpers;
            }

            //todo: use validator to enhance template validation
            response = {
                status: 200,
                body: dummyJson.parse(jsonTemplate, dummyOptions)
            };

            break;


        //Simulates a bad response (404) - 10.4.5 404 Not Found
        case 'notFound':
            response = {
                status: 404,
                body: route.errorBody ? route.errorBody : '10.4.5 404 Not Found'
            };
            break;

        //Simulates a bad response (408) - 10.4.9 408 Request Timeout
        case 'timeout':
            response = {
                status: 408,
                body: route.errorBody ? route.errorBody : '10.4.9 408 Request Timeout'
            };
            break;

        //Simulates a bad response (401) - 10.4.2 401 Unauthorized
        case 'unauthorized':
            response = {
                status: 401,
                body: route.errorBody ? route.errorBody : '10.4.2 401 Unauthorized'
            };
            break;

        //Simulates a bad response (403) - 10.4.4 403 Forbidden
        case 'forbidden':
            response = {
                status: 403,
                body: route.errorBody ? route.errorBody : '10.4.4 403 Forbidden'
            };
            break;

        //Simulates a bad response (400) - 10.4.1 400 Bad Request
        case 'badRequest':
            response = {
                status: 400,
                body: route.errorBody ? route.errorBody : '10.4.1 400 Bad Request'
            };
            break;

        //Simulates a bad response (500) - 10.5.1 500 Internal Server Error
        case 'error':
            response = {
                status: 500,
                body: route.errorBody ? route.errorBody : '10.5.1 500 Internal Server Error'
            };
            break;

        //Defaults to a successful response (200) - 10.2.1 200 OK
        default:
            response = {
                status: 200,
                body: route.errorBody ? route.errorBody : '10.2.1 200 OK'
            };
            break;
    }


    return response;
}

function _tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object",
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return o;
        }
    }
    catch (e) { }

    return false;
}

function parseUrl (urlString) {
    var urlArray = urlString.split("?");
    var path = urlArray[0]; // TODO: come back to this to actually parse the path
    var query = (urlArray.length > 1)? parseQueryString(urlArray[1]) : null;
    return {path: path, query: query};
}

function parseQueryString(queryString) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};