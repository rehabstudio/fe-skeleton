'use strict';

/**
 *  Watches specific types of assets, or all, based on a CLI parameter.
 *  When any of these source files associated with an asset type changes
 *  this triggers compilation methods.
 *
 *  Example Usage:
 *  gulp watch
 *  gulp watch --watchType styles
 *  gulp watch --watchType styles,templates
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common');

gulp.task('watch', function() {
    var watchFunctions = {
        styles: function() {
            console.log('Watching styles...');
            gulp.watch(common.watchPaths.styles, ['styles']);
        },
        scripts: function() {
            console.log('Watching scripts...');
            gulp.watch(common.watchPaths.scripts, ['scripts']);
        },
        templates: function() {
            console.log('Watching templates...');
            gulp.watch(common.watchPaths.templates, ['scripts']);
        }
    };

    common.setupWatchers(args, watchFunctions);
});