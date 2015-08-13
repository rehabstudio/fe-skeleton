'use strict';

/**
 *  Checks chosen JS source files and reports any errors.
 *
 *  NOTE: JSCS is not a linter; it enforces coding style only and
 *  doesn't check for coding errors, abnormalities or misuse.
 *
 *  Potential Options:
 *  http://jscs.info/rules.html
 *
 *  Current options based upon Google preset:
 *  https://github.com/jscs-dev/node-jscs/blob/master/presets/google.json
 *
 *  Example Usage:
 *  gulp jscs
 *  gulp jscs --via-commit
 *  gulp jscs --filePath js/src/app.js
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    chalk = require('chalk'),
    common = require('./_common'),
    debug = require('gulp-debug'),
    jscs = require('gulp-jscs');

gulp.task('jscs', function() {
    return gulp.src(common.buildSources(args.filePath))
        .pipe(jscs())
        .pipe(debug({ title: 'JSCS:' }))
        .on('error', function() {
            if (args.viaCommit) {
                setTimeout(function() {
                    console.log(chalk.bgRed.white("\n FE Skeleton: Your commit has failed! Fix errors then try to re-commit."));
                }, 0);
            }
        });
});
