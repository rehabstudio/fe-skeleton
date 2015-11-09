'use strict';

/**
 *  Checks chosen JS source files and reports any errors.
 *  Configure via `.jscsrc` file in project root.
 *
 *  NOTE: JSCS is not a linter; it enforces coding style only and
 *  doesn't check for coding errors, abnormalities or misuse.
 *
 *  Potential Options:
 *  http://jscs.info/rules.html
 *
 *  Example Usage:
 *  gulp jscs
 *  gulp jscs --via-commit
 *  gulp jscs --filePath js/src/app.js
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    args = require('yargs').argv,
    globalSettings = require('../../config'),
    debug = require('gulp-debug'),
    jscs = require('gulp-jscs');

gulp.task('jscs', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] : globalSettings.scriptSourcePaths;

    return gulp.src(sourceFiles)
        .pipe(debug({ title: 'JSCS:' }))
        .pipe(jscs())
        .on('error', function() {
            if (args.viaCommit) {
                setTimeout(function() {
                    console.log(chalk.bgRed.white("\n FE Skeleton: Your commit has failed! Fix errors then try to re-commit."));
                }, 0);
            }
        });
});
