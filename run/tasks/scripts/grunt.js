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

function _requireJS() {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.config.set('requirejs.options', common.requirejs.defaults);
    grunt.config.set('requirejs.options.logLevel', true);

    for (var i = 0, length = common.requirejs.bundles.length; i < length; i++) {
        var thisBuild = common.requirejs.bundles[i],
            uniqueBuildKey = 'build-' + i + '.options';

        grunt.config.set('requirejs.' + uniqueBuildKey, thisBuild);
    }

    grunt.task.run(['requirejs']);
}

function _browserify() {
    console.log('NOTE: Use Gulp if you\'re wanting to compile via Browserify.');
}

grunt.registerTask('scripts', function() {
    if (globalSettings.moduleFormat === 'requirejs') {
        _requireJS();
    } else {
        _browserify();
    }
});