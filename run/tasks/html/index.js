'use strict';

/**
 *  Moves HTML assets (maintaining folder structure) to
 *  the global `destPath` directory.
 *
 *  Example Usage:
 *  gulp html
 */

var gulp = require('gulp'),
    common = require('./_common'),
    chalk = require('chalk'),
    globalSettings = require('../../_global');

gulp.task('html', function() {
    return gulp.src(common.srcPaths)
        .pipe(gulp.dest(globalSettings.destPath))
        .on('finish', function() {
            console.log(chalk.bgGreen.white(' FE Skeleton: HTML assets moved.'));
        });
});