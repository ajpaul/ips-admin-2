var webpackConfig = require('./config/webpack.test.js');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-ajax','jasmine'],

        reporters: ['progress', 'junit'],

        // the default configuration
        junitReporter: {
        outputDir: '', // results will be saved as $outputDir/$browserName.xml
        outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
        suite: '', // suite will become the package name attribute in xml testsuite element
        useBrowserName: true, // add browser name to report and classes names
        nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
        classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
        properties: {} // key value pair of properties to add to the <properties> section of the report
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,

        files: [
            {pattern: './config/karma-test-shim.js', watched: false}
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },
    });
}