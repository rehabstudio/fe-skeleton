'use strict';

/**
 *  Moves HTML assets (maintaining folder structure) to
 *  the global `destPath` directory.
 *
 *  Example Usage:
 *  gulp html
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    globalSettings = require('../../config');

gulp.task('html', function() {
    return gulp.src(globalSettings.taskConfiguration.html.sourcePaths)
        .pipe(gulp.dest(globalSettings.destPath))
        .on('finish', function() {
            console.log(chalk.bgGreen.white(' FE Skeleton: HTML assets moved.'));
        });
});