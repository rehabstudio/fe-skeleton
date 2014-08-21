'use strict';

/**
 *  Compiles, minifies and prefixes SASS.
 *
 *  Example Usage:
 *  grunt styles
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');

grunt.config.set('sass', {
    dist: {
        files: [{
            expand: true,
            cwd: './css/src',
            src: ['*.scss'],
            dest: './css',
            ext: '.css'
        }]
    },
    options: common.sassSettings
});

grunt.config.set('autoprefixer', {
    dist: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'css/'
    },
    options: {
        browsers: common.autoPrefixSettings.browsers,
        map: true
    }
});

grunt.registerTask('styles', function() {
    grunt.task.run(['sass', 'autoprefixer']);
});