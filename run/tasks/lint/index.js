'use strict';

/**
 * Lints chosen source files and reports any errors.
 * Configure via `.jshintrc` file in project root.
 *
 * Example Usage:
 * gulp lint
 * gulp lint --filePath js/src/app.js
 */

var gulp = require('gulp');
var chalk = require('chalk');
var args = require('yargs').argv;
var globalSettings = require('../../config');
var debug = require('gulp-debug');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] : globalSettings.lintingSourcePaths;

    return gulp.src(sourceFiles)
        .pipe(jshint())
        .pipe(debug({title: 'Lint:'}))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', function() {
            if (args.viaCommit) {
                setTimeout(function() {
                    console.log(chalk.bgRed.white('\n FE Skeleton: Your commit failed! Fix errors then re-commit.'));
                }, 0);
            }
        });
});
