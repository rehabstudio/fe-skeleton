/**
 * Builds all necessary front-end static files into the distribution folder.
 * This method is primarily used during deployment or initial setup.
 *
 * Example Usage:
 * gulp build
 */

import clean from '../clean/'; // eslint-disable-line
import copy from '../copy/'; // eslint-disable-line
import html from '../html/'; // eslint-disable-line
import images from '../images/'; // eslint-disable-line
import style from '../styles/'; // eslint-disable-line
import scripts from '../scripts/'; // eslint-disable-line
import gulp from 'gulp';
import chalk from 'chalk';
import runSequence from 'run-sequence';
import globalSettings from '../../config';

gulp.task('build', (done) => {
    runSequence('clean', ['copy', 'html', 'images', 'styles', 'scripts'], () => {
        if (Object.keys(globalSettings.taskConfiguration.scripts.webpackSettings.entry).length === 0) {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no script bundles defined.'));
        }

        if (globalSettings.taskConfiguration.styles.bundles.length === 0) {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no style bundles defined.'));
        }

        done();
    });
});
