/**
 * Loseless optimization of PNG, JPG & SVG assets.
 *
 * Example Usage:
 * gulp images
 */

import gulp from 'gulp';
import globalSettings from '../../config';
import imagemin from 'gulp-imagemin';

let options = globalSettings.taskConfiguration.images;

gulp.task('images', function() {
    return gulp.src(options.sourcePaths, {base: './'})
                .pipe(imagemin([
                    imagemin.gifsicle(options.imageminPlugins.gifsicle),
                    imagemin.jpegtran(options.imageminPlugins.jpegtran),
                    imagemin.optipng(options.imageminPlugins.optipng),
                    imagemin.svgo(options.imageminPlugins.svgo)
                ]))
                .pipe(gulp.dest(globalSettings.destPath));
});
