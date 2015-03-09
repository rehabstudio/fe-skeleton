module.exports = function(config) {
    'use strict';

    config.set({
        basePath: '',
        client: {
            mocha: {
                timeout: 8000
            }
        },
        frameworks: ['mocha', 'browserify', 'chai', 'sinon'],
        preprocessors: {
            'js/tests/**/*.spec.js': ['browserify']
        },
        browserify: {
            transform: ['hbsfy'],
            watch: false
        },
        files: [
            'js/tests/**/*.spec.js'
        ],
        exclude: [],
        junitReporter: {
            outputFile: 'fe-test-results.xml'
        },
        reporters: ['progress', 'junit'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        logLevel: config.LOG_INFO
    });
};