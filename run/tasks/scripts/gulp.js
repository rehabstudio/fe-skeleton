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
    extractor = require('gulp-extract-sourcemap'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglifyjs');

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
 *  Uses Browserify API to create a stream. This is then converted into
 *  a stream that Gulp understands (via `vinyl-source-stream`).
 *
 *  This is then passed to `vinyl-buffer` where the streams contents are
 *  converted into a Buffer. The inline source map from Browserify is
 *  extracted and added to the stream as another file / save reference
 *  in the exchange object.
 *
 *  We then filter the stream down to only target the JS file, then uglify
 *  it and generate a sourcemap based on the original data.
 *
 *  @param {function} resolve - Promise resolution callback.
 *  @param {function} reject - Promise rejection callback.
 */
function _processBundle(resolve, reject) {
    var self = this;

    // Make a clone of the uglify settings object so it can be added to.
    var uglifySourceMapSettings = _.extend({}, common.uglifySourceMapSettings);

    // Combining uglify defaults with custom options for sourcemapping.
    var uglifyOptions = _.extend({}, common.uglifySettings, {
        outSourceMap: true,
        output: {
            source_map: uglifySourceMapSettings
        }
    });

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
        .pipe(source(self.fileName + '.js'))
        .pipe(buffer())
        .pipe(extractor({
            removeSourcesContent: true
        }))
        .on('postextract', function(sourceMap) {
            uglifySourceMapSettings.orig = sourceMap;
        })
        .pipe(filter('**/*.js'))
        .pipe(uglify(self.fileName + common.buildFileSuffix, uglifyOptions))
        .pipe(gulp.dest(globalSettings.destPath + common.outputFolder))
        .on('end', function() {
            console.log('Browserify Completed: ' + self.srcPath + self.fileName + '.js');
            resolve();
        });
}