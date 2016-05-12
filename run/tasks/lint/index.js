'use strict';

/**
 * Checks chosen JS source files and reports any errors.
 * Configure via `.eslintrc.js` file in project root.
 *
 * Potential Options:
 * http://eslint.org/docs/rules/
 *
 * Example Usage:
 * gulp lint
 * gulp lint --filePath js/src/app.js
 */

var gulp = require('gulp');
var args = require('yargs').argv;
var globalSettings = require('../../config');
var debug = require('gulp-debug');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] :
    globalSettings.taskConfiguration.lint.sourcePaths;

    return gulp.src(sourceFiles)
        .pipe(debug({title: 'ESLint:'}))
        .pipe(eslint({configFile: './.eslintrc.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
