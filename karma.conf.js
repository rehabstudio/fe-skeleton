// Loading dependencies.
var _ = require('underscore'),
    globalSettings = require('./run/_global');

// Browserify settings that both RequireJS and Browserify agree on.
var defaultSettings = {
    basePath: '',
    client: {
        mocha: {
            timeout: 8000
        }
    },
    exclude: [],
    junitReporter: {
        outputFile: 'fe-test-results.xml'
    },
    reporters: ['progress', 'junit'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
};

// Create an object containing implementation specific settings.
if (globalSettings.moduleFormat === 'browserify') {
    var specificSettings = {
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
        ]
    };
} else {
    var specificSettings = {
        frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],
        files: [
            { pattern: 'js/libs/**/*.js', included: false },
            { pattern: 'js/src/**/*.js', included: false },
            { pattern: 'js/tests/**/*.spec.js', included: false },
            'js/tests/requirejs-main.js'
        ]
    };
}

// Create an object which combines the defaults with the implementation specific.
var combinedSettings = _.extend({}, defaultSettings, specificSettings);

module.exports = function(config) {
    'use strict';

    // Appending this setting in the closure as it has access to the config object.
    combinedSettings.logLevel = config.LOG_INFO;

    config.set(combinedSettings);
};