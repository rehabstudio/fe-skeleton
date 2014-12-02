'use strict';

/**
 *  Loseless optimization of PNG, JPG & SVG assets.
 *
 *  Example Usage:
 *  grunt images
 */

var grunt = require('grunt'),
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-svgmin');

grunt.config.set('imagemin', {
    dist: {
        files: [{
            expand: true,
            cwd: './img/',
            src: ['**/*.png', '**/*.jpg'],
            dest: common.destPath,
        }]
    },
    options: {
        cache: false
    }
});

grunt.config.set('svgmin', {
    dist: {
        files: [{
            expand: true,
            cwd: './img/',
            src: ['**/*.svg'],
            dest: common.destPath
        }]
    },
    options: {
        plugins: common.svgoPlugins
    }
});

grunt.registerTask('images', function() {
    grunt.task.run(['imagemin', 'svgmin']);
});