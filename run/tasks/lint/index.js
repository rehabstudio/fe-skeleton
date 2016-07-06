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

import gulp from 'gulp';
import {argv as args} from 'yargs';
import globalSettings from '../../config';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';

gulp.task('lint', function() {
    let sourceFiles = (typeof(args.filePath) === 'string') ? [args.filePath] :
    globalSettings.taskConfiguration.lint.sourcePaths;

    return gulp.src(sourceFiles)
        .pipe(debug({title: 'ESLint:'}))
        .pipe(eslint({configFile: './.eslintrc.json'}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
