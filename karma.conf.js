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
            transform: [
                require('hbsfy'),
                [
                    require('rehab-fe-skeleton-testsuite/node_modules/browserify-istanbul'),
                    {
                        ignore: ['**/node_modules/**', '**/bower_components/**', '**/*.spec.js'],
                        defaultIgnore: false
                    }
                ]
            ],
            watch: false
        },
        files: [
            'js/tests/**/*.spec.js'
        ],
        exclude: [],
        coverageReporter: {
            dir: './',
            reporters: [
                { type: 'cobertura', subdir: '.', file: 'fe-coverage-results.xml' },
                { type: 'text' }
            ]
        },
        reporters: ['progress', 'coverage'],
        port: 9876,
        colors: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        logLevel: config.LOG_INFO
    });
};