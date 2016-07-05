'use strict';

/**
 * Copies a set of desired assets into the distribution folder.
 *
 * Example Usage:
 * gulp copy
 */

var gulp = require('gulp');
var globalSettings = require('../../config');

gulp.task('copy', function() {
    return gulp.src(globalSettings.taskConfiguration.copy.sourcePaths, {base: './'})
               .pipe(gulp.dest(globalSettings.destPath));
});
