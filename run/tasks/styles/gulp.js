'use strict';

/**
 *  Compiles, minifies and prefixes SASS.
 *
 *  Note: Sourcemaps are WIP in the AutoPrefixer.
 *  https://github.com/Metrime/gulp-autoprefixer/issues/3
 *
 *  Example Usage:
 *  grunt styles
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common'),
    _ = require('underscore'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
    var combinedSettings = _.extend({
        sourcemapPath: './src'
    }, common.sassSettings);

    return gulp.src(common.srcPaths)
        .pipe(plumber())
        .pipe(sass(combinedSettings))
        .pipe(prefix(common.autoPrefixSettings.browsers), { map: false })
        .pipe(gulp.dest('./css'));
});