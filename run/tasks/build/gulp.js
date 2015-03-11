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
    globalSettings = require('../../_global'),
    mergeStream = require('merge-stream');

gulp.task('build', ['styles', 'scripts'], function() {
    var htmlStream = gulp.src(['./html/**/*.html'])
                         .pipe(gulp.dest(globalSettings.destPath));

    var assetStream = gulp.src(['./fonts/**/!(dir.txt)', './img/**/!(dir.txt)'], { base: './' })
                          .pipe(gulp.dest(globalSettings.destPath));

    return mergeStream(htmlStream, assetStream);
});
