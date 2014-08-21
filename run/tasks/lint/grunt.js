'use strict';

/**
 *  Lints chosen source files and reports any errors.
 *
 *  Example Usage:
 *  grunt lint
 *  grunt lint --filePath js/src/app.js
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.config.set('jshint', {
    all: common.srcPaths,
    options: {
        jshintrc: '.jshintrc'
    }
});

grunt.registerTask('lint', function() {
	grunt.config.set('jshint.all', common.buildSources(args.filePath));
	grunt.task.run('jshint');
});