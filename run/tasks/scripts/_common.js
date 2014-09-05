'use strict';

module.exports = {
    /**
     *  An array of objects symbolising bundles requiring built.
     *
     *  Example Bundles:
     *  { name: 'src/homepage', out: 'js/homepage.min.js' },
     *  { name: 'src/contact-us', out: 'js/contact-us.min.js' }
     */
    bundles: [
    ],

    // Default optimizer options.
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
};