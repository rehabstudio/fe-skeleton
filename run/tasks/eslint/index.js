'use strict';

/**
 * Checks chosen JS source files and reports any errors.
 * Configure via `.eslintrc.js` file in project root.
 *
 * Potential Options:
 * http://eslint.org/docs/rules/
 *
 * Example Usage:
 * gulp eslint
 * gulp eslint --filePath js/src/app.js
 */

var gulp = require('gulp');
var args = require('yargs').argv;
var globalSettings = require('../../config');
var debug = require('gulp-debug');
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
    var sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] : globalSettings.lintingSourcePaths;

    return gulp.src(sourceFiles)
        .pipe(debug({title: 'ESLint:'}))
        .pipe(eslint({configFile: './.eslintrc.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
