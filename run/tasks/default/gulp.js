'use strict';

/**
 * Test default task.
 */

var gulp = require('gulp');
var common = require('./_common');

gulp.task('default', function() {
    console.log('This is a Gulp task');
    common._sayHello();
});



