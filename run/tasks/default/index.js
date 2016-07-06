'use strict';

/**
 * The default method of the task runner triggers a build task.
 *
 * Example Usage:
 * gulp
 */

require('../build/');

var gulp = require('gulp');

gulp.task('default', function() {
    gulp.start('build');
});
