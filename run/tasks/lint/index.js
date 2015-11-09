'use strict';

/**
 *  Lints chosen source files and reports any errors.
 *  Configure via `.jshintrc` file in project root.
 *
 *  Example Usage:
 *  gulp lint
 *  gulp lint --filePath js/src/app.js
 */

var gulp = require('gulp'),
    chalk = require('chalk'),
    args = require('yargs').argv,
    globalSettings = require('../../config'),
    debug = require('gulp-debug'),
    jshint = require('gulp-jshint');

gulp.task('lint', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] : globalSettings.scriptSourcePaths;

    return gulp.src(sourceFiles)
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