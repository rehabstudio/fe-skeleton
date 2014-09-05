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
    common = require('./_common'),
    globalSettings = require('../../_global');

gulp.task('default', function() {
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

            if (globalSettings.moduleFormat === 'requirejs') {
                gulp.watch(common.watchPaths.templates, ['templateWatcher']);
            } else {
                gulp.watch(common.watchPaths.templates, ['scripts']);
            }
        }
    };

    common.setupWatchers(args, watchFunctions);
});

/**
 *  This task exists to ensure that templates are called and completed
 *  before attempting to build JS files. Gulp would run these two methods
 *  in tandem and the build file wouldn't pick up the new template files.
 */
gulp.task('templateWatcher', ['templates'], function() {
    gulp.start('scripts');
});