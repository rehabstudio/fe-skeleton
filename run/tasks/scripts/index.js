/**
 * Bundles JS source files via Webpack.
 *
 * Example Usage:
 * gulp scripts
 * gulp scripts --is-production
 */

import gulp from 'gulp';
import {argv as args} from 'yargs';
import globalSettings from '../../config';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import webpackStream from 'webpack-stream';
let webpack = webpackStream.webpack;

/**
 * Wrapper task that calls the webpack-stream package with
 * configuration and outputs bundles.
 *
 * @return {Object} - Stream.
 */
gulp.task('scripts', () => {
    return _runWebpack();
});

/**
 * Wrapper task that calls the webpack-stream package with
 * configuration and outputs bundles. This variation will
 * pass through an option which turns on watch mode.
 *
 * @return {Object} - Stream.
 */
gulp.task('scripts:watch', () => {
    return _runWebpack({watch: true});
});

/**
 * DRY method used by watchers and direct compilation tasks.
 *
 * Takes webpack base settings and adds plugins as required
 * based upon command-line arguments and task options.
 *
 * Note: Uglification greatly increases compile times,
 *       as does source maps.
 *
 * @param {Object} taskOptions - Options from gulp tasks.
 * @return {Object} - Gulp stream.
 */
function _runWebpack(taskOptions = {}) {
    // Bind a shorter reference to the script settings from the global file.
    var scriptSettings = globalSettings.taskConfiguration.scripts;

    // Outputs sourcemaps for all bundles.
    scriptSettings.webpackSettings.plugins.push(
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    );

    // If production argument was specified then add UglifyJS plugin into webpack.
    if (args.hasOwnProperty('is-production') && args['is-production'] === true) {
        scriptSettings.webpackSettings.plugins.push(
            new webpack.optimize.UglifyJsPlugin(scriptSettings.uglifySettings)
        );
    }

    // Asking webpack to watch will keep the process running until it's cancelled.
    // It will also start up a BrowserSync server which hosts the `dist` folder.
    if (taskOptions.watch) {
        scriptSettings.webpackSettings.watch = true;

        if (args.hasOwnProperty('serve') === false || (args.hasOwnProperty('serve') && args.serve !== false)) {
            scriptSettings.webpackSettings.plugins.push(
                new BrowserSyncPlugin(scriptSettings.browserSyncSettings)
            );
        }
    }

    // Open a stream, trigger webpack-stream compilation and push output to file system.
    return gulp.src([])
               .pipe(webpackStream(scriptSettings.webpackSettings))
               .pipe(gulp.dest(globalSettings.destPath + scriptSettings.genericOutputFolder));
}
