'use strict';

/**
 *  Builds all necessary front-end static files and moves imagery
 *  and fonts into the distribution folder also. This method is
 *  primarily used during deployment or initial setup.
 *
 *  Example Usage:
 *  gulp build
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    globalSettings = require('../../_global');

gulp.task('build', ['styles', 'scripts'], function() {
    return gulp.src(['./fonts/**/*', './img/**/*'], { base: './' })
               .pipe(gulp.dest(globalSettings.destPath));
});