'use strict';

/**
 *  Starts the test runner which in turn loads test frameworks,
 *  assertion libraries and then executes tests.
 *
 *  Example Usage:
 *  grunt test
 *  grunt test --watch
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common'),
    karma = require('karma');

grunt.registerTask('test', function() {
    var karmaSettings = {
        configFile: common.configPath
    };

    if (args.watch) {
        karmaSettings.autoWatch = true;
        karmaSettings.singleRun = false;
    }

    karma.server.start(karmaSettings, function() {
        this.async()
    });
});