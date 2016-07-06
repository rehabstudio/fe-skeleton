'use strict';

/**
 * Builds all necessary front-end static files into the distribution folder.
 * This method is primarily used during deployment or initial setup.
 *
 * Example Usage:
 * gulp build
 */

require('../clean/');
require('../copy/');
require('../html/');
require('../images/');
require('../styles/');
require('../scripts/');

var gulp = require('gulp');
var chalk = require('chalk');
var runSequence = require('run-sequence');
var globalSettings = require('../../config');

gulp.task('build', function(done) {
    runSequence('clean', ['copy', 'html', 'images', 'styles', 'scripts'], function() {
        if (Object.keys(globalSettings.taskConfiguration.scripts.webpackSettings.entry).length === 0) {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no script bundles defined.'));
        }

        if (globalSettings.taskConfiguration.styles.bundles.length === 0) {
            console.log(chalk.bgYellow.gray(' FE Skeleton: Warning - There are no style bundles defined.'));
        }

        done();
    });
});
