'use strict';

/**
 *  Watches specific types of assets, or all, based on a CLI parameter.
 *  When any of these source files associated with an asset type changes
 *  this triggers compilation methods.
 *
 *  Example Usage:
 *  gulp
 *  gulp --watchType styles
 *  gulp --watchType styles,templates
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common');

gulp.task('default', function() {
    var watchFunctions = {
        styles: function() {
            console.log('Watching styles...');
            gulp.watch(common.watchPaths.styles, ['styles']);
        },
        templates: function() {
            console.log('Watching templates...');
            gulp.watch(common.watchPaths.templates, ['templates']);
        }
    };

    common.setupWatchers(args, watchFunctions);
});