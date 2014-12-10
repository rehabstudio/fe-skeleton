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
    globalSettings = require('../../_global'),
    _ = require('underscore'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer');

gulp.task('styles', function(taskDone) {
    var promises = [];

    for (var index = 0, length = common.bundles.length; index < length; index++) {
        var thisBundle = common.bundles[index],
            scopedProcessingMethod = _processBundle.bind(thisBundle);

        thisBundle.index = index;
        thisBundle.promise = new Promise(scopedProcessingMethod);
        promises.push(thisBundle.promise);
    }

    Promise.all(promises).then(
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
 *  @param {function} resolve - Promise resolution callback.
 *  @param {function} reject - Promise rejection callback.
 *  @return null.
 */
function _processBundle(resolve, reject) {
    var self = this;

    // Merging shared settings with some Gulp/Bundle specific settings.
    // Container is important when building more than one bundle.
    var combinedSassSettings = _.extend({
        sourcemapPath: './src',
        container: 'sass-tmp-container-' + self.index
    }, common.sassSettings);

    // Generating path to source file.
    var sourcePath = self.srcPath + self.fileName + '.scss';

    // Compile SASS into CSS then prefix and save.
    var stream = gulp.src(sourcePath)
        .pipe(plumber())
        .pipe(sass(combinedSassSettings))
        .pipe(prefix(common.autoPrefixSettings.browsers), { map: false })
        .pipe(gulp.dest(globalSettings.destPath + common.outputFolder));

    // Whenever the stream finishes, resolve or reject the deferred accordingly.
    stream
        .on('error', function() {
            reject();
        })
        .on('end', function() {
            resolve();
        });
}
