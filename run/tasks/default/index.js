/**
 * The default method of the task runner triggers a build task.
 *
 * Example Usage:
 * gulp
 */

import * as build from '../build/'; // eslint-disable-line
import gulp from 'gulp';

gulp.task('default', () => {
    gulp.start('build');
});
