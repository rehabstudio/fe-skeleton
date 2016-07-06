/**
 * Moves HTML assets (maintaining folder structure) to
 * the global `destPath` directory.
 *
 * Example Usage:
 * gulp html
 */

import gulp from 'gulp';
import chalk from 'chalk';
import globalSettings from '../../config';

gulp.task('html', () => {
    return gulp.src(globalSettings.taskConfiguration.html.sourcePaths)
        .pipe(gulp.dest(globalSettings.destPath))
        .on('finish', () => {
            console.log(chalk.bgGreen.white(' FE Skeleton: HTML assets moved.'));
        });
});
