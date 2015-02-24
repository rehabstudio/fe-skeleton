'use strict';

/**
 *  Builds all necessary front-end static files and moves imagery
 *  and fonts into the distribution folder also. This method is
 *  primarily used during deployment or initial setup.
 *
 *  Example Usage:
 *  grunt build
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    globalSettings = require('../../_global');

grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('build', function() {
    grunt.task.run(['styles', 'scripts', 'moveAssets']);
});

grunt.registerTask('moveAssets', function() {
    grunt.config.set('copy', {
        assets: {
            files: [
                { expand: true, src: ['./img/**/*'], dest: globalSettings.destPath },
                { expand: true, src: ['./fonts/**/*'], dest: globalSettings.destPath }
            ]
        },
        options: {
            mode: true
        }
    });

    grunt.task.run(['copy']);
});