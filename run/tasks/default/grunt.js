'use strict';

/**
 *  Watches specific types of assets, or all, based on a CLI parameter.
 *  When any of these source files associated with an asset type changes
 *  this triggers compilation methods.
 *
 *  Example Usage:
 *  grunt
 *  grunt --watchType styles
 *  grunt --watchType styles,templates
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-watch');

grunt.config.set('watch', {
    options: {
        interrupt: true
    }
});

grunt.registerTask('default', function() {
    var watchFunctions = {
        styles: function() {
            console.log('Watching styles...');
            grunt.config.set('watch.styles', {
                files: common.watchPaths.styles,
                tasks: ['styles']
            });
        },
        templates: function() {
            console.log('Watching templates...');
            grunt.config.set('watch.templates', {
                files: common.watchPaths.templates,
                tasks: ['templates']
            });
        }
    };

    common.setupWatchers(args, watchFunctions);
    grunt.task.run(['watch']);
});