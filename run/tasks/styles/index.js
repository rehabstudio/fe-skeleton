'use strict';

/**
 *  Compiles, minifies and prefixes SASS.
 *
 *  Example Usage:
 *  gulp styles
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    globalSettings = require('../../config'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

/**
 *  Overall function that will cycle through each of the styles bundles
 *  and once they're all completed, trigger the completion of the gulp task.
 *
 *  @param {Object} taskDone - Gulp task callback method.
 */
gulp.task('styles', function(taskDone) {
    var promises = [];

    for (var index = 0, length = globalSettings.taskConfiguration.styles.bundles.length; index < length; index++) {
        var thisBundle = globalSettings.taskConfiguration.styles.bundles[index],
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
 *  @param {Function} resolve - Promise resolution callback.
 *  @param {Function} reject - Promise rejection callback.
 */
function _processBundle(resolve, reject) {
    var self = this;

    // Apply particular options if global settings dictate source files should be referenced inside sourcemaps.
    var sourcemapOptions = {};
    if (globalSettings.sourcemapOptions.type === 'External_ReferencedFiles') {
        sourcemapOptions.includeContent = false;
        sourcemapOptions.sourceRoot = globalSettings.sourcemapOptions.sourceRoot;
    }

    // Determine the output folder. Use a specified folder if one
    // is set, else use the generic output folder.
    var outputDirectory;
    if (self.outputFolder) {
        outputDirectory = self.outputFolder;
    } else {
        outputDirectory = globalSettings.destPath + globalSettings.taskConfiguration.styles.genericOutputFolder;
    }

    // Compile SASS into CSS then prefix and save.
    var stream = gulp.src(self.sourceFilePath)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(globalSettings.taskConfiguration.styles.sassSettings).on('error', sass.logError))
        .pipe(prefix(globalSettings.taskConfiguration.styles.autoPrefixSettings))
        .pipe(rename(function(path) {
            path.basename = self.outputFileName;
        }))
        .pipe(sourcemaps.write('./', sourcemapOptions))
        .pipe(gulp.dest(outputDirectory));

    // Whenever the stream finishes, resolve or reject the deferred accordingly.
    stream
        .on('error', function() {
            console.log(chalk.bgRed.white(' FE Skeleton: Stylesheet Failed.'));
            reject();
        })
        .on('end', function() {
            console.log(chalk.bgGreen.white(' FE Skeleton: Stylesheet Completed - ' + self.sourceFilePath));
            console.log(chalk.bgGreen.white('              Output location - ' + outputDirectory + self.outputFileName + '.css'));
            resolve();
        });
}
