Error.stackTraceLimit = Infinity;

 require('ts-helpers');
// require('core-js/es7/reflect');
require('core-js/es6');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('jasmine-ajax');

var appContext = require.context('../src/app', false, /\.spec\.ts/);
console.log(appContext.keys());
appContext.keys().forEach(appContext);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);
console.log('789');