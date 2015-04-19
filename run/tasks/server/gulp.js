'use strict';

/**
 *  Hosts the `dist` folder on a specific port.
 *
 *  Example Usage:
 *  gulp server
 */

var gulp = require('gulp'),
    common = require('./_common'),
    globalSettings = require('../../_global'),
    webserver = require('gulp-webserver');

gulp.task('server', function() {
    return gulp.src(globalSettings.destPath)
               .pipe(webserver(common.webserverSettings));
});