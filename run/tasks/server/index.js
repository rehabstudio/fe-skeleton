'use strict';

/**
 * Hosts the `dist` folder on a specific port.
 *
 * Example Usage:
 * gulp server
 */

var gulp = require('gulp');
var chalk = require('chalk');
var fs = require('fs');
var globalSettings = require('../../config');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
    var distFolderExists = false;
    try {
        distFolderExists = fs.statSync(globalSettings.destPath);
    } catch (e) {}

    if (!distFolderExists) {
        console.log(chalk.bgRed.white(' FE Skeleton: Cannot run server. Dist folder doesn\'t exist.'));
        return process.exit(1);
    }

    return gulp.src(globalSettings.destPath)
               .pipe(webserver(globalSettings.taskConfiguration.server.webserverSettings));
});
