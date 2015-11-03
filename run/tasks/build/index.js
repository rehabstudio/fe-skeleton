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
    globalSettings = require('../../_global'),
    scriptSettings = require('../scripts/_common'),
    styleSettings = require('../styles/_common');

gulp.task('build', ['html', 'images', 'styles', 'scripts'], function() {
    if (scriptSettings.bundles.length === 0) {
        console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no script bundles defined.'));
    }

    if (styleSettings.bundles.length === 0) {
        console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no style bundles defined.'));
    }

    return gulp.src(['./fonts/**/!(dir.txt)'], { base: './' })
               .pipe(gulp.dest(globalSettings.destPath));
});
