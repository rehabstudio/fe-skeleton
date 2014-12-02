'use strict';

/**
 *  Compiles, minifies and prefixes SASS.
 *
 *  Example Usage:
 *  grunt styles
 */

var grunt = require('grunt'),
    common = require('./_common');

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');

grunt.config.set('sass', {
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
    for (var index = 0, length = common.bundles.length; index < length; index++) {
        // Generate a unique build key for this row of the bundles array.
        var uniqueBuildKey = 'build-' + index,
            thisBundle = common.bundles[index];

        // Generate paths for this row.
        var destPath = common.destPath + thisBundle.fileName + '.css',
            sourcePath = thisBundle.srcPath + thisBundle.fileName + '.scss',
            buildObject = {};

        // Apply the generated dest / source paths to the build object.
        buildObject.files = {};
        buildObject.files[destPath] = sourcePath;

        // Apply this specific build configuration to the overall SASS settings.
        grunt.config.set('sass.' + uniqueBuildKey, buildObject);
    }

    // Compile SASS into CSS then prefix and save.
    grunt.task.run(['sass', 'autoprefixer']);
});