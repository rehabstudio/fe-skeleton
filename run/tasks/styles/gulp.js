'use strict';

/**
 *  Compiles, minifies and prefixes SASS.
 *
 *  Note: Sourcemaps are WIP in the AutoPrefixer.
 *  https://github.com/Metrime/gulp-autoprefixer/issues/3
 *
 *  Example Usage:
 *  grunt styles
 */

var gulp = require('gulp'),
    common = require('./_common'),
    _ = require('underscore'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('styles', function() {
    for (var index = 0, length = common.bundles.length; index < length; index++) {

        // Merging shared settings with some Gulp/Bundle specific settings.
        // Container is important when building more than one bundle.
        var combinedSassSettings = _.extend({
            sourcemapPath: './src',
            container: 'sass-tmp-container-' + index
        }, common.sassSettings);

        // Generating path to source file.
        var thisBundle = common.bundles[index],
            sourcePath = thisBundle.srcPath + thisBundle.fileName + '.scss';

        // Compile SASS into CSS then prefix and save.
        gulp.src(sourcePath)
            .pipe(plumber())
            .pipe(sass(combinedSassSettings))
            .pipe(prefix(common.autoPrefixSettings.browsers), { map: false })
            .pipe(gulp.dest(common.destPath));

    }
});