'use strict';

/**
 *  Builds all necessary front-end static files and moves fonts
 *  into the distribution folder also. This method is primarily
 *  used during deployment or initial setup.
 *
 *  Example Usage:
 *  gulp build
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    args = require('yargs').argv,
    globalSettings = require('../../config');

gulp.task('build', ['html', 'images', 'styles', 'scripts'], function() {
    if (Object.keys(globalSettings.taskConfiguration.scripts.webpackSettings.entry).length === 0) {
        console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no script bundles defined.'));
    }

    if (globalSettings.taskConfiguration.styles.bundles.length === 0) {
        console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no style bundles defined.'));
    }

    return gulp.src(globalSettings.taskConfiguration.build.sourcePaths, { base: './' })
               .pipe(gulp.dest(globalSettings.destPath));
});
