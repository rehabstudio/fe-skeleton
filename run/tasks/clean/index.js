'use strict';

/**
 * Removes a collection of specified directory paths (includes `destPath`) in
 * preparation for new build files being created and placed. It ensures if
 * there's been any change in configuration (i.e. file names) that old files
 * will be cleaned up.
 *
 * Example Usage:
 * gulp clean
 */

var gulp = require('gulp');
var chalk = require('chalk');
var globalSettings = require('../../config');
var del = require('del');

gulp.task('clean', function() {
    var targetPaths = [globalSettings.destPath];

    targetPaths = targetPaths.concat(globalSettings.taskConfiguration.clean.additionalTargetPaths);

    return del(
        targetPaths,
        globalSettings.taskConfiguration.clean.delOptions
    ).then(function(paths) {
        console.log(chalk.bgGreen.white(' FE Skeleton: Folders Cleaned - ', paths.join('\n')));
    });
});
