'use strict';

/**
 *  Concatenates and minifys JS source files.
 *
 *  Example Usage:
 *  gulp scripts
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    globalSettings = require('../../_global'),
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

    for (var index = 0, length = globalSettings.taskConfiguration.scripts.bundles.length; index < length; index++) {
        var thisBundle = globalSettings.taskConfiguration.scripts.bundles[index],
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

    // Adding entry point file, bundling other files, converting to a stream, dealing with sourcemaps then uglifying and saving to file system.
    bundleStream
        .add(self.srcPath + self.fileName + '.js')
        .bundle()
        .on('error', function(error) {
            console.log(chalk.bgRed.white(' FE Skeleton: Browserify Failed - ' + error.message));
            reject();
        })
        .pipe(source(self.fileName + globalSettings.taskConfiguration.scripts.buildFileSuffix))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify(globalSettings.taskConfiguration.scripts.uglifySettings))
        .pipe(sourcemaps.write('./', sourcemapOptions))
        .pipe(gulp.dest(globalSettings.destPath + globalSettings.taskConfiguration.scripts.outputFolder))
        .on('end', function() {
            console.log(chalk.bgGreen.white(' FE Skeleton: Browserify Completed - ' + self.srcPath + self.fileName + '.js'));
            resolve();
        });
}