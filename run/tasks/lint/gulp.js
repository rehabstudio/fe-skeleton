'use strict';

/**
 *  Lints chosen source files and reports any errors.
 *
 *  Example Usage:
 *  gulp lint
 *  gulp lint --filePath js/src/app.js
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common'),
    jshint = require('gulp-jshint');

gulp.task('lint', function() {
    var sourceList = common.buildSources(args.filePath);
    return gulp.src(sourceList)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});