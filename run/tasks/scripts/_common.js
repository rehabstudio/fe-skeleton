'use strict';

module.exports = {
    requirejs: {
        /**
         *  An array of objects symbolising bundles requiring built.
         *
         *  Bundle Options:
         *  `name` - Module path and name of initial script file. Relative to `/js/`.
         *  `out` - Path and filename of bundled script. Relative to `package.json` and `gulpfile.js`.
         *
         *  Example Bundles:
         *  { name: 'src/homepage', out: 'js/homepage.min.js' },
         *  { name: 'src/contact-us', out: 'js/contact-us.min.js' }
         */
        bundles: [
        ],

        /**
         *  Default optimizer options.
         */
        defaults: {
            // Removes any license comments that wouldn't normally be stripped.
            preserveLicenseComments: false,

            // Uglify2 has the ability to generate source maps.
            generateSourceMaps: true,

            // How to optimize all the JS files in the build output directory.
            optimize: 'uglify2',

            // Scripts and paths are loaded relatively to this location.
            baseUrl: 'js',

            // Uses the require.config options found from this file.
            mainConfigFile: 'js/src/config.r.js',

            // Any additional paths to add (or remove) alongisde those from the mainConfigFile.
            // This is used to provide 'empty:' values to modules that shouldn't / can't be minified.
            paths: {
            },

            // Targeting individual build files doesn't include the global config, as the optimizer
            // doesn't read these dependencies. To ensure a single payload, we include the config
            // into it as well as the actual RequireJS library itself.
            include: [
                'requireJS',
                'src/config.r'
            ],

            // The name of the initial JS file to load (relative to the baseUrl).
            name: null,

            // Location and name of file to be output (relative to this script).
            out: null
        }
    },

    browserify: {
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

        // Settings that get fed into UglifyJS.
        uglifySourceMapSettings: {
            root: '/', // Sets sourceRoot in source map file.
            orig: null // Updated during inline sourcemap extraction.
        },

        // Gets appended to a bundles `fileName` and placed into `outputFolder`.
        buildFileSuffix: '.min.js',

        // Where to place the built bundles. Is prefixed with `destPath` from global settings.
        outputFolder: './js/'
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