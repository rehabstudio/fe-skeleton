'use strict';

/**
 * Acts as a wrapper for JSCS and JSHint linting tasks.
 *
 * Example Usage:
 * gulp lint
 * gulp lint --filePath ./js/src/app.js
 */

var gulp = require('gulp');
var chalk = require('chalk');

gulp.task('lint', ['eslint', 'jscs'], function() {
    console.log(chalk.bgGreen.white(' FE Skeleton: JSCS / JSHint checks have all passed! '));
});
