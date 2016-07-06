/**
 * Copies a set of desired assets into the distribution folder.
 *
 * Example Usage:
 * gulp copy
 */

import gulp from 'gulp';
import globalSettings from '../../config';

gulp.task('copy', () => {
    return gulp.src(globalSettings.taskConfiguration.copy.sourcePaths, {base: './'})
               .pipe(gulp.dest(globalSettings.destPath));
});
