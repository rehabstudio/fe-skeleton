'use strict';

/**
 *  Builds all necessary front-end static files.
 *  This method is primarily used during deployment.
 *
 *  Example Usage:
 *  gulp build
 */

var grunt = require('grunt'),
    args = require('yargs').argv;

grunt.registerTask('build', function() {
    grunt.task.run(['styles', 'scripts']);
});