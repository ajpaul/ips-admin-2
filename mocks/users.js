/**
 * Created by sxd15 on 8/23/2016.
 */

var mocks = [];

var GetResults = {
    name: 'GetResults',
    mockRoute: 'users',
    testScope: 'success', //success | fail | error
    testScenario: 'singleResult',
    jsonTemplate: [
        {
            multipleResults: function () {
                return '[{{#repeat 18}}' +
                    '{' +
                    '   "id":654461,' +
                    '   "fileTypeId":{{number 100}},' +
                    '   "fileTypeName":"{{company}}",' +
                    '   "fileTypeDescription":"{{company}}",' +
                    '   "drawerId":{{number 100}},' +
                    '   "drawerName":"{{company}}",' +
                    '   "drawerDescription":"{{company}}",' +
                    '   "notesId":{{number 100}},' +
                    '   "description":"{{company}}",' +
                    '   "fileNumberPart1":"{{company}}",' +
                    '   "fileNumberPart2":"",' +
                    '   "fileNumberPart3":"pt3",' +
                    '   "isTemporary":{{boolean}},' +
                    '   "isDeleted":{{boolean}},' +
                    '   "dateLastOpened":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "lastModified":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "dateCreated":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "attributes":[{{#repeat 5}}' +
                    '       {' +
                    '           "name":"NameStr{{number 10}}",' +
                    '           "value":{' +
                    '           }' +
                    '       } {{/repeat}}' +
                    '   ]' +
                    '} {{/repeat}}' +
                    ']';
            }
        },
        {
            singleResult: function () {
                return '[{{#repeat 1}}' +
                    '{' +
                    '   "id":654461,' +
                    '   "fileTypeId":{{number 100}},' +
                    '   "fileTypeName":"{{company}}",' +
                    '   "fileTypeDescription":"{{company}}",' +
                    '   "drawerId":{{number 100}},' +
                    '   "drawerName":"{{company}}",' +
                    '   "drawerDescription":"{{company}}",' +
                    '   "notesId":{{number 100}},' +
                    '   "description":"{{company}}",' +
                    '   "fileNumberPart1":"{{company}}",' +
                    '   "fileNumberPart2":"",' +
                    '   "fileNumberPart3":"pt3",' +
                    '   "isTemporary":{{boolean}},' +
                    '   "isDeleted":{{boolean}},' +
                    '   "dateLastOpened":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "lastModified":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "dateCreated":"2015-06-01T17:41:20.3992519-04:00",' +
                    '   "attributes":[{{#repeat 5}}' +
                    '       {' +
                    '           "name":"NameStr{{number 10}}",' +
                    '           "value":{' +
                    '           }' +
                    '       } {{/repeat}}' +
                    '   ]' +
                    '} {{/repeat}}' +
                    ']';
            }
        },
        {
            twentyResultsWithUniqueIds: function () {
                var files = [];

                for (var i = 0; i < 20; i++) {
                    var file = {
                        id: i,
                        fileTypeId: 100,
                        fileTypeName: "No FileType",
                        fileTypeDescription: "No FileType",
                        drawerId: 100,
                        drawerName: "No Drawer",
                        drawerDescription: "No Drawer",
                        notesId: 1,
                        description: 'File ' + i,
                        fileNumberPart1: 'File ' + i,
                        fileNumberPart2: "",
                        fileNumberPart3: "",
                        isTemporary: false,
                        isDeleted: false,
                        dateLastOpened: "2015-06-01T17:41:20.3992519-04:00",
                        lastModified: "2015-06-01T17:41:20.3992519-04:00",
                        dateCreated: "2015-06-01T17:41:20.3992519-04:00"
                    };
                    files.push(file);
                }

                return JSON.stringify(files);
            }
        }
    ]
};
mocks.push(GetResults);
exports.mocks = mocks;