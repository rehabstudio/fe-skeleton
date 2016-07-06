/**
 * Removes a collection of specified directory paths (includes `destPath`) in
 * preparation for new build files being created and placed. It ensures if
 * there's been any change in configuration (i.e. file names) that old files
 * will be cleaned up.
 *
 * Example Usage:
 * gulp clean
 */

import gulp from 'gulp';
import chalk from 'chalk';
import globalSettings from '../../config';
import del from 'del';

gulp.task('clean', () => {
    return del(
        globalSettings.taskConfiguration.clean.targetPaths,
        globalSettings.taskConfiguration.clean.delOptions
    ).then((paths) => {
        console.log(chalk.bgGreen.white(` FE Skeleton: Folders Cleaned - ${paths.join('\n')}`));
    });
});
