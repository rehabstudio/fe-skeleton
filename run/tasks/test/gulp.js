'use strict';

/**
 *  Starts the test runner which in turn loads test frameworks,
 *  assertion libraries and then executes tests.
 *
 *  Example Usage:
 *  gulp test
 *  gulp test --watch
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common'),
    karma = require('karma');

gulp.task('test', function(done) {
    var karmaSettings = {
        configFile: common.configPath
    };

    if (args.watch) {
        karmaSettings.autoWatch = true;
        karmaSettings.singleRun = false;
    }

    karma.server.start(karmaSettings, function() {
        done();
    });
});