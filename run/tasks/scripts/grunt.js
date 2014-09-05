'use strict';

/**
 *  Concatenates and minifys JS source files.
 *
 *  Example Usage:
 *  grunt scripts
 */

var grunt = require('grunt'),
    args = require('yargs').argv,
    common = require('./_common'),
    globalSettings = require('../../_global');

grunt.loadNpmTasks('grunt-contrib-requirejs');

grunt.registerTask('scripts', function() {
    grunt.config.set('requirejs.options', common.defaults);
    grunt.config.set('requirejs.options.logLevel', true);

    for (var i = 0, length = common.bundles.length; i < length; i++) {
        var thisBuild = common.bundles[i],
            uniqueBuildKey = 'build-' + i + '.options';

        grunt.config.set('requirejs.' + uniqueBuildKey, thisBuild);
    }

    grunt.task.run(['requirejs']);
});