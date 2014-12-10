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
    _ = require('underscore');

function _requireJS() {
    var requirejs = require('requirejs');

    for (var i = 0, length = common.requirejs.bundles.length; i < length; i++) {
        var thisBuild = common.requirejs.bundles[i],
            combinedOptions = _.extend({
                uglify2: common.uglifySettings
            }, common.requirejs.defaults, thisBuild);

        requirejs.optimize(combinedOptions, function(buildOutput) {
            console.log(buildOutput);
        });
    }
}

/**
 *  Overall function that will cycle through each of the browserify bundles
 *  and once they're all completed, trigger the completion of the gulp task.
 *
 *  @param {object} taskDone - Gulp task callback method.
 */
function _browserify(taskDone) {
    var promises = [];

    for (var index = 0, length = common.browserify.bundles.length; index < length; index++) {
        var thisBundle = common.browserify.bundles[index],
            scopedProcessingMethod = _processBrowserifyBundle.bind(thisBundle);

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
}

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
 *  it and generate a sourcempa based on the original data.
 *
 *  @param {function} resolve - Promise resolution callback.
 *  @param {function} reject - Promise rejection callback.
 */
function _processBrowserifyBundle(resolve, reject) {
    var browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        extractor = require('gulp-extract-sourcemap'),
        filter = require('gulp-filter'),
        uglify = require('gulp-uglifyjs'),
        self = this;

    // Make a clone of the uglify settings object so it can be added to.
    var uglifySourceMapSettings = _.extend({}, common.browserify.uglifySourceMapSettings);

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
        .pipe(uglify(self.fileName + common.browserify.buildFileSuffix, uglifyOptions))
        .pipe(gulp.dest(common.browserify.destPath))
        .on('end', function() {
            console.log('Browserify Completed: ' + self.srcPath + self.fileName + '.js');
            resolve();
        });
}

gulp.task('scripts', function(taskDone) {
    if (globalSettings.moduleFormat === 'requirejs') {
        _requireJS();
    } else {
        _browserify(taskDone);
    }
});