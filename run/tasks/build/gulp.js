'use strict';

/**
 *  Builds all necessary front-end static files.
 *  This method is primarily used during deployment.
 *
 *  Example Usage:
 *  gulp build
 */

var gulp = require('gulp'),
    args = require('yargs').argv;

gulp.task('build', ['styles', 'scripts']);