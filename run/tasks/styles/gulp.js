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
    prefix = require('gulp-autoprefixer'),
    When = require('when');

gulp.task('styles', function(taskDone) {
    var promises = [];

    for (var index = 0, length = common.bundles.length; index < length; index++) {
        var thisBundle = common.bundles[index];

        thisBundle.deferred = new When.defer();
        promises.push(thisBundle.deferred.promise);
        processBundle(thisBundle, index);
    }

    var allCompleted = new When.all(promises);
    allCompleted.done(
        function() {
            taskDone();
        },
        function() {
            taskDone('Something went wrong.');
        }
    );
});

/**
 *  Processes a bundle from the array and converts the SASS into
 *  CSS and prefixes as necessary. Completion of the task is
 *  signalled via resolving or rejecting the bundles deferred.
 *
 *  @param {object} bundle - Object from the bundles array.
 *  @param {number} index - The index of the bundle within the array.
 *  @return null.
 */
function processBundle(bundle, index) {
    // Merging shared settings with some Gulp/Bundle specific settings.
    // Container is important when building more than one bundle.
    var combinedSassSettings = _.extend({
        sourcemapPath: './src',
        container: 'sass-tmp-container-' + index
    }, common.sassSettings);

    // Generating path to source file.
    var sourcePath = bundle.srcPath + bundle.fileName + '.scss';

    // Compile SASS into CSS then prefix and save.
    var stream = gulp.src(sourcePath)
        .pipe(plumber())
        .pipe(sass(combinedSassSettings))
        .pipe(prefix(common.autoPrefixSettings.browsers), { map: false })
        .pipe(gulp.dest(common.destPath));

    // Whenever the stream finishes, resolve or reject the deferred accordingly.
    stream
        .on('error', function() {
            bundle.deferred.reject();
        })
        .on('end', function() {
            bundle.deferred.resolve();
        });
}
