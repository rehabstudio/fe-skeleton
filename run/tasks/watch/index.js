/**
 * Watches specific types of assets, or all, based on a CLI parameter.
 * When any of these source files associated with an asset type changes
 * this triggers compilation methods.
 *
 * Example Usage:
 * gulp watch
 * gulp watch --no-serve
 * gulp watch --watchType styles
 * gulp watch --watchType styles,html
 */

import build from '../build/'; // eslint-disable-line
import gulp from 'gulp';
import {argv as args} from 'yargs';
import chalk from 'chalk';
import globalSettings from '../../config';

gulp.task('watch', ['build'], () => {
    let watchFunctions = {
        html: () => {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Watching HTML.'));
            gulp.watch(globalSettings.taskConfiguration.watch.sourcePaths.html, ['html']);
        },
        styles: () => {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Watching styles.'));
            gulp.watch(globalSettings.taskConfiguration.watch.sourcePaths.styles, ['styles']);
        },
        scripts: () => {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Watching scripts.'));
            gulp.run('scripts:watch');
        }
    };

    // If no arguments were supplied then we start all watches.
    // Else cycle supplied argumentss and build an array of method names.
    let watchMethods;

    if (!args.watchType) {
        watchMethods = Object.keys(watchFunctions);
    } else {
        watchMethods = args.watchType.split(',').map((currentValue) => {
            return currentValue.trim();
        });
    }

    // Cycle through the method names requiring watchers setup and call them.
    watchMethods.forEach((methodName) => {
        watchFunctions[methodName]();
    });
});
