'use strict';

/**
 *  Bundles JS source files via Webpack.
 *
 *  Example Usage:
 *  gulp scripts
 *  gulp scripts --is-production
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    globalSettings = require('../../_global'),
    webpackStream = require('webpack-stream'),
    configGenerator = require('./_config');

/**
 * Wrapper task that calls the webpack-stream package with
 * configuration and outputs bundles.
 *
 * @return {Object} - Stream.
 */
gulp.task('scripts', function() {
    return _runWebpack();
});

/**
 * Wrapper task that calls the webpack-stream package with
 * configuration and outputs bundles. This variation will
 * pass through an option which turns on watch mode.
 *
 * @return {Object} - Stream.
 */
gulp.task('scripts:watch', function() {
    return _runWebpack({ watch: true });
});

/**
 * DRY method used by watchers and direct compilation tasks.
 *
 * @param {Object} taskOptions - Options from gulp tasks.
 */
function _runWebpack(taskOptions) {
    // Ensure there is an options object (incase none were supplied to this function).
    taskOptions = taskOptions || {};

    // Check for the existence of a particular production flag and set accordingly.
    taskOptions.isProduction = (args.hasOwnProperty('is-production') && args['is-production'] === true);

    // Open a stream, trigger webpack-stream compilation and push output to file system.
    return gulp.src([])
        .pipe(webpackStream(configGenerator.generateAppConfig(taskOptions)))
        .pipe(gulp.dest(globalSettings.destPath));
}
