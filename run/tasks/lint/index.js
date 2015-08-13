'use strict';

/**
 *  Lints chosen source files and reports any errors.
 *
 *  Example Usage:
 *  gulp lint
 *  gulp lint --filePath js/src/app.js
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    chalk = require('chalk'),
    common = require('./_common'),
    debug = require('gulp-debug'),
    jshint = require('gulp-jshint');

gulp.task('lint', function() {
    return gulp.src(common.buildSources(args.filePath))
        .pipe(jshint())
        .pipe(debug({ title: 'Lint:' }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', function() {
            if (args.viaCommit) {
                setTimeout(function() {
                    console.log(chalk.bgRed.white("\n FE Skeleton: Your commit has failed! Fix errors then try to re-commit."));
                }, 0);
            }
        });
});