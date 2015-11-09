'use strict';

// Loading dependencies.
var webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack;

/**
 * Default configuration file for Webpack to use as a
 * basis for app and test suite bundles.
 *
 * @type {Object}
 */
var baseConfig = {
    /**
     * A folder path that is prefixed with the global `destPath` to give a
     * standard destination for JS bundles.
     *
     * @type {String}
     */
    genericOutputFolder: './js/',

    /**
     * Settings for webpacks uglify plugin.
     *
     * @type {Object}
     */
    uglifySettings: {
        compress: {
            drop_console: false,
            drop_debugger: false,
            warnings: false
        }
    },

    /**
     * Base settings for webpack.
     *
     * NOTE: For a full list of options, please visit:
     * https://webpack.github.io/docs/configuration.html
     *
     * @type {Object}
     */
    webpackSettings: {

        /**
         * Whether to watch for bundle changes or not.
         * Note: Only recompiles bundles affected by changes.
         *
         * @type {Boolean}
         */
        watch: false,

        /**
         * Defines entry points for bundles.
         * This acts as a mapping of Chunk Name -> Entry File.
         *
         * Example Bundles:
         * entry: {
         *     main: './js/src/bundle-main.js'
         *     about:'./js/src/bundle-about.js'
         *     vendor: ['angular', 'angular-aria', 'angular-animate', 'angular-material']
         * }
         *
         * @type {Object}
         */
        entry: {
        },

        /**
         * Bundle output settings.
         *
         * @type {Object}
         */
        output: {
            /**
             * Acts as a template for naming bundled scripts.
             *
             * @type {String}
             */
            filename: '[name].js'
        },

        /**
         * Options affecting normal modules.
         *
         * @type {Object}
         */
        module: {
            /**
             * Loaders that will be automatically applied to loaded modules.
             *
             * @type {Array}
             */
            loaders: [
                /**
                 * Runs project source files through Babel.
                 *
                 * @type {Object}
                 */
                { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=es2015' }
            ]
        },

        /**
         * Plugins needing run whenever building bundles.
         *
         * @type {Array}
         */
        plugins: [
        ]

    }
};

module.exports = {
    /**
     * Takes webpack base settings and adds plugins to the
     * base as required based upon command-line arguments
     * and task options.
     *
     * Note: Uglification greatly increases compile times,
     *       as does source maps.
     *
     * @param {Object} taskOptions
     * @param {Boolean} options.isProduction - If true, uglifies bundles.
     * @param {Boolean} options.watch        - If true, process stays alive and watches.
     * @return {Object}
     */
    generateWebpackAppConfig: function(taskOptions) {
        // Outputs sourcemaps for all bundles.
        baseConfig.webpackSettings.plugins.push(
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
        );

        // Asking webpack to watch will keep the process running until it's cancelled.
        if (taskOptions.watch) {
            baseConfig.webpackSettings.watch = true;
        }

        // If production argument was specified then add UglifyJS plugin into webpack.
        if (taskOptions.isProduction) {
            baseConfig.webpackSettings.plugins.push(
                new webpack.optimize.UglifyJsPlugin(baseConfig.uglifySettings)
            );
        }

        // Will need to clone this object of course, and add to it.
        return baseConfig.webpackSettings;
    },

    /**
     * Returns the webpack configuration in its default state.
     * @return {Object}
     */
    getWebpackBaseConfig: function() {
        return baseConfig.webpackSettings;
    },

    /**
     * Returns the overall base configuration object.
     *
     * @return {Object}
     */
    getBaseConfig: function() {
        return baseConfig;
    }

};