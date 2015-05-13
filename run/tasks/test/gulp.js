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
    chalk = require('chalk'),
    args = require('yargs').argv,
    common = require('./_common');

// Attempt to load test suite package to see if it is present or not.
var testSuiteWrapper = false;
try { testSuiteWrapper = require('fe-skeleton-testsuite'); } catch(e) {}

gulp.task('test', function(done) {
    if (!testSuiteWrapper) {
        console.log(chalk.bgRed.white(' FE Skeleton: Missing `fe-skeleton-testsuite` package. Please install in `devDependencies`.'));
        done(1);
        return;
    }

    var karmaSettings = {
        configFile: common.configPath
    };

    if (args.watch) {
        karmaSettings.autoWatch = true;
        karmaSettings.singleRun = false;
    }

    testSuiteWrapper.runTests(karmaSettings, done);
});