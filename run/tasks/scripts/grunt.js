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
    grunt.config.set('requirejs.options.uglify2', common.uglifySettings);
    grunt.config.set('requirejs.options.logLevel', true);

    for (var i = 0, length = common.requirejs.bundles.length; i < length; i++) {
        var thisBuild = common.requirejs.bundles[i],
            uniqueBuildKey = 'build-' + i + '.options';

        grunt.config.set('requirejs.' + uniqueBuildKey, thisBuild);
    }

    grunt.task.run(['requirejs']);
}

function _browserify() {
    grunt.loadNpmTasks('grunt-browserify');

    grunt.config.set('browserify', {
        options: {
            browserifyOptions: {
                debug: true
            },
            transform: ['hbsfy']
        }
    });

    for (var i = 0, length = common.browserify.bundles.length; i < length; i++) {
        var thisBundle = common.browserify.bundles[i],
            uniqueBuildKey = 'build-' + i,
            buildObj = {},
            destFile = common.browserify.destPath + thisBundle.fileName + common.browserify.buildFileSuffix,
            srcFile = thisBundle.srcPath + thisBundle.fileName + '.js',
            mapOutputPath = destFile + '.map';

        if (thisBundle.excludes && thisBundle.excludes.length > 0) {
            buildObj.exclude = thisBundle.excludes;
        }

        buildObj.files = {};
        buildObj.files[destFile] = srcFile;
        buildObj.options = {
            plugin: [
                ['minifyify', {
                    map: mapOutputPath.replace('./', '/'),
                    output: mapOutputPath,
                    minify: true,
                    uglify: common.uglifySettings
                }]
            ]
        };

        grunt.config.set('browserify.' + uniqueBuildKey, buildObj);
    }

    grunt.task.run(['browserify']);
}

grunt.registerTask('scripts', function() {
    if (globalSettings.moduleFormat === 'requirejs') {
        _requireJS();
    } else {
        _browserify();
    }
});