'use strict';

/**
 *  Concatenates and minifys JS source files.
 *
 *  Example Usage:
 *  gulp scripts
 */

var gulp = require('gulp'),
    common = require('./_common'),
    globalSettings = require('../../_global'),
    _ = require('underscore'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

/**
 *  Overall function that will cycle through each of the browserify bundles
 *  and once they're all completed, trigger the completion of the gulp task.
 *
 *  @param {object} taskDone - Gulp task callback method.
 */
gulp.task('scripts', function(taskDone) {
    var promises = [];

    for (var index = 0, length = common.bundles.length; index < length; index++) {
        var thisBundle = common.bundles[index],
            scopedProcessingMethod = _processBundle.bind(thisBundle);

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
 *  Uses Browserify API to create a node stream. This is then converted
 *  into a stream that Gulp understands (via `vinyl-source-stream`).
 *
 *  This is then passed to `vinyl-buffer` where the streams contents are
 *  converted into a Buffer. The inline source map from Browserify is
 *  picked up by `gulp-sourcemaps`.
 *
 *  We then uglify the contents of the stream, via `gulp-uglify` which has
 *  `gulp-sourcemaps` support and updates the original map. The map is then
 *  saved out to the desired location and the process completes.
 *
 *  @param {function} resolve - Promise resolution callback.
 *  @param {function} reject - Promise rejection callback.
 */
function _processBundle(resolve, reject) {
    var self = this;

    // Apply particular options if global settings dictate source files should be referenced inside sourcemaps.
    var sourcemapOptions = {};
    if (globalSettings.sourcemapOptions.type === 'External_ReferencedFiles') {
        sourcemapOptions.includeContent = false;
        sourcemapOptions.sourceRoot = globalSettings.sourcemapOptions.sourceRoot;
    }

    // Creating a browserify instance / stream.
    var bundleStream = browserify({ debug: true });

    // If this bundle is asking to explicitly exclude certain modules, do so.
    if (self.excludes && self.excludes.length > 0) {
        for (var j = 0, excludesLength = self.excludes.length; j < excludesLength; j++) {
            bundleStream.exclude(self.excludes[j]);
        }
    }

    // Adding source file, transforming its templates, dealing with sourcemaps, then uglifying.
    bundleStream
        .add(self.srcPath + self.fileName + '.js')
        .transform('hbsfy')
        .bundle()
        .on('error', function(error) {
            console.log('Browserify Failed: ' + error.message);
            reject();
        })
        .pipe(source(self.fileName + common.buildFileSuffix))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify(common.uglifySettings))
        .pipe(sourcemaps.write('./', sourcemapOptions))
        .pipe(gulp.dest(globalSettings.destPath + common.outputFolder))
        .on('end', function() {
            console.log('Browserify Completed: ' + self.srcPath + self.fileName + '.js');
            resolve();
        });
}