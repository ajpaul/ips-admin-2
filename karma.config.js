var webpackConfig = require('./config/webpack.test.js');

module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS2'],
        basePath: '',
        frameworks: ['jasmine-ajax','jasmine'],
        reporters: ['progress', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,

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

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        exclude: ['./dist'],

        proxies: {
            '/assets/': '/base/src/assets/'
        },

        files: [
            {pattern: './config/karma-test-shim.js', watched: false},
            {pattern: './src/assets/*.png', watched: false, included: false, served: true},
        ],

        preprocessors: {
            './config/karma-test-shim.js': ['webpack']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        }
    });
}