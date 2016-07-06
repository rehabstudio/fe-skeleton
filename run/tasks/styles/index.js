/**
 * Compiles, minifies and prefixes SASS.
 *
 * Example Usage:
 * gulp styles
 */

import gulp from 'gulp';
import chalk from 'chalk';
import globalSettings from '../../config';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';

/**
 * Overall function that will cycle through each of the styles bundles
 * and once they're all completed, trigger the completion of the gulp task.
 *
 * @param {Object} taskDone - Gulp task callback method.
 */
gulp.task('styles', (taskDone) => {
    let promises = [];

    for (let index = 0, length = globalSettings.taskConfiguration.styles.bundles.length; index < length; index++) {
        let thisBundle = globalSettings.taskConfiguration.styles.bundles[index];
        let scopedProcessingMethod = _processBundle.bind(thisBundle);

        thisBundle.index = index;
        thisBundle.promise = new Promise(scopedProcessingMethod);
        promises.push(thisBundle.promise);
    }

    Promise.all(promises).then(
        () => {
            taskDone();
        },
        () => {
            taskDone('Something went wrong.');
        }
    );
});

/**
 * Processes a bundle from the array and converts the SASS into
 * CSS and prefixes as necessary. Completion of the task is
 * signalled via resolving or rejecting the bundles deferred.
 *
 * @param {Function} resolve - Promise resolution callback.
 * @param {Function} reject - Promise rejection callback.
 */
function _processBundle(resolve, reject) {
    let self = this;

    // Apply particular options if global settings dictate source files should be referenced inside sourcemaps.
    let sourcemapOptions = {};

    if (globalSettings.taskConfiguration.styles.sourcemapOptions.type === 'External_ReferencedFiles') {
        sourcemapOptions.includeContent = false;
        sourcemapOptions.sourceRoot = globalSettings.taskConfiguration.styles.sourcemapOptions.sourceRoot;
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
    let stream = gulp.src(self.sourceFilePath)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass(globalSettings.taskConfiguration.styles.sassSettings).on('error', sass.logError))
        .pipe(prefix(globalSettings.taskConfiguration.styles.autoPrefixSettings))
        .pipe(rename((path) => {
            path.basename = self.outputFileName;
        }))
        .pipe(sourcemaps.write('./', sourcemapOptions))
        .pipe(gulp.dest(outputDirectory));

    // Whenever the stream finishes, resolve or reject the deferred accordingly.
    stream
        .on('error', () => {
            console.log(chalk.bgRed.white(' FE Skeleton: Stylesheet Failed.'));
            reject();
        })
        .on('end', () => {
            console.log(chalk.bgGreen.white(` FE Skeleton: Stylesheet Completed - ${self.sourceFilePath}`));
            console.log(chalk.bgGreen.white(
                `              Output location - ${outputDirectory + self.outputFileName}.css`
            ));
            resolve();
        });
}
