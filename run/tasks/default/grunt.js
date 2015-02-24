'use strict';

/**
 *  The default method of the task runner triggers a build task.
 *
 *  Example Usage:
 *  grunt
 */

var grunt = require('grunt'),
    args = require('yargs').argv;

grunt.registerTask('default', function() {
    grunt.task.run(['build']);
});