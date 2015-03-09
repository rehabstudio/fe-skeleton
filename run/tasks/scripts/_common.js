'use strict';

module.exports = {
    /**
     *  An array of objects symbolising bundles requiring built.
     *
     *  Bundle Options:
     *  `srcPath` - Folder where source files can be found. Relative to `package.json` and `gulpfile.js`.
     *  `fileName` - File within `srcPath` which is the bundle starting point.
     *  `excludes` - Any package names that need to be excluded from bundle i.e. `jquery`.
     *
     *  Example Bundles:
     *  { srcPath: './js/src/', fileName: 'homepage', excludes: [] },
     *  { srcPath: './js/src/', fileName: 'contact-us', excludes: [] }
     */
    bundles: [
    ],

    // Gets appended to a bundles `fileName` and placed into `outputFolder`.
    buildFileSuffix: '.min.js',

    // Where to place the built bundles. Is prefixed with `destPath` from global settings.
    outputFolder: './js/'

    // Settings that get fed into UglifyJS.
    uglifySourceMapSettings: {
        root: '/', // Sets sourceRoot in source map file.
        orig: null // Updated during inline sourcemap extraction.
    },

    // Settings for UglifyJS2.
    uglifySettings: {
        compress: {
            drop_console: false,
            drop_debugger: false,
            warnings: false
        }
    }
};