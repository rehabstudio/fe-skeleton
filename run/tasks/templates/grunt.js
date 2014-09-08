'use strict';

/**
 *  Pre-compiles handlebars templates to JS file.
 *  NOTE: Only needed for RequireJS workflow.
 *
 *  Example Usage:
 *  grunt templates
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-handlebars');

grunt.config.set('handlebars', {
    dist: {
        files: [{
            expand: true,
            cwd: common.srcDirectory,
            src: common.srcPath,
            dest: common.destPath,
            ext: '.js'
        }]
    },
    options: {
        amd: true,
        namespace: false
    }
});

grunt.registerTask('templates', function() {
    grunt.task.run(['handlebars']);
});