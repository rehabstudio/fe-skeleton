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
            transform: [require('hbsfy'), require('rehab-fe-skeleton-testsuite/node_modules/browserify-istanbul')],
            watch: false
        },
        files: [
            'js/tests/**/*.spec.js'
        ],
        exclude: [],
        junitReporter: {
            outputFile: 'fe-test-results.xml'
        },
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'cobertura', subdir: '.', file: 'fe-coverage-results.xml' },
                { type: 'text' }
            ]
        },
        reporters: ['progress', 'junit', 'coverage'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        logLevel: config.LOG_INFO
    });
};