'use strict';

/**
 * Checks chosen JS source files and reports any errors.
 * Configure via `.jscsrc` file in project root.
 *
 * NOTE: JSCS is not a linter; it enforces coding style only and
 * doesn't check for coding errors, abnormalities or misuse.
 *
 * Potential Options:
 * http://jscs.info/rules.html
 *
 * Example Usage:
 * gulp jscs
 * gulp jscs --via-commit
 * gulp jscs --filePath js/src/app.js
 */

var gulp = require('gulp');
var chalk = require('chalk');
var args = require('yargs').argv;
var globalSettings = require('../../config');
var debug = require('gulp-debug');
var jscs = require('gulp-jscs');

gulp.task('jscs', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] : globalSettings.lintingSourcePaths;

    return gulp.src(sourceFiles)
        .pipe(debug({title: 'JSCS:'}))
        .pipe(jscs())
        .on('error', function() {
            if (args.viaCommit) {
                setTimeout(function() {
                    console.log(chalk.bgRed.white('\n FE Skeleton: Your commit failed! Fix errors then re-commit.'));
                }, 0);
            }
        });
});
