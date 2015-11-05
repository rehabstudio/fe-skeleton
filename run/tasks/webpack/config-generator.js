'use strict';

// Loading dependencies.
var globalSettings = require('../../_global'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack;










var config = {
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

        }











    // Options that affect normal modules.
    module: {
        // Loaders are similar to Browserify tranforms (which pre-process files).
        loaders: [

            // Loads HTML files as strings.
            { test: /\.html$/, loader: 'html' },

            // Injecting a falsy define value in so CommonJS overrules AMD.
            { test: /slick\.js$/, loader: 'imports?define=>false' },

            // These libraries have incorrect / missing UMD wrappers so we must grab an internal value to export.
            { test: /angular\.js$/, loader: 'exports?angular' },
            { test: /angular-animate\.js$/, loader: 'exports?angular.module(\'ngAnimate\')' },
            { test: /angular-aria\.js$/, loader: 'exports?angular.module(\'ngAria\')' },
            { test: /angular-messages\.js$/, loader: 'exports?angular.module(\'ngMessages\')' },
            { test: /angular-material\.js$/, loader: 'exports?angular.module(\'ngMaterial\')' },
            { test: /angular-touch\.js$/, loader: 'exports?angular.module(\'ngTouch\')' },
            { test: /angular-carousel\.js$/, loader: 'exports?angular.module(\'angular-carousel\')' },
            { test: /angular-ui-router\.js$/, loader: 'exports?angular.module(\'ui.router\')' },

            // Starting slash necessary to ensure "ng-i18next.js" file doesn't match.
            { test: /\/i18next\.js$/, loader: 'expose?i18next' },

            // Runs ng-annotate on our source code.
            // https://www.npmjs.com/package/ng-annotate-loader
            { test: /\.js$/, loaders: ['ng-annotate'] }
        ],

        // Ignores parsing particular files.
        // This will greatly speed up compilation as these files don't need scanned.
        // The files are expected to have no calls to require, define or similar.
        // They are allowed to use exports and module.exports.
        noParse: [
            /angular\.js$/,
            /angular-animate\.js$/,
            /angular-aria\.js$/,
            /angular-messages\.js$/,
            /angular-material\.js$/,
            /angular-touch\.js$/,
            /angular-ui-router\.js$/,
            /picturefill\.js$/
        ]
    },

    //  Replace modules with other modules or paths (to point at our third_party vendors).
    //
    //  NOTE: `browser` field of `package.json` worked but only for our app dependencies.
    //        Any third-party library that had requires didn't seem to read from `browser`.
    resolve: {
        alias: {
            'slick-carousel': resolve.sync('../../../third_party/js/slick-carousel/slick/slick.js'),
            'angular': resolve.sync('../../../third_party/js/bower-angular-1.3.15/angular.js'),
            'angular-animate': resolve.sync('../../../third_party/js/bower-angular-animate-1.3.15/angular-animate.js'),
            'angular-aria': resolve.sync('../../../third_party/js/bower-angular-aria-1.3.15/angular-aria.js'),
            'angular-messages': resolve.sync('../../../third_party/js/bower-angular-messages-1.3.15/angular-messages.js'),
            'angular-touch': resolve.sync('../../../third_party/js/bower-angular-touch-1.3.15/angular-touch.js'),

            'angular-mocks': resolve.sync('../../../third_party/js/bower-angular-mocks-1.3.15/angular-mocks.js'),
            'angular-material': resolve.sync('../../../third_party/js/bower-material-0.10.0/angular-material.js'),
            'angular-ui-router': resolve.sync('../../../third_party/js/ui-router-0.2.15/release//angular-ui-router.js'),
            'picturefill': resolve.sync('../../../third_party/js/picturefill-2.3.1/dist/picturefill.js')
        }
    },

    // Specify dependencies that shouldn't be resolved by webpack. These becomesdependencies
    // of the output. This means they're imported from the global scope of the browser. All
    // require calls for the specified module IDs will be updated accordingly.
    externals: {
        'jquery': 'window.$'
    },

    // An array of plugins to run whenever building bundles.
    plugins: [
    ],

    // Defining multiple bundles needing built.
    // This is a mapping of Chunk Name -> Entry File.
    entry: {
    },



}





























};




























module.exports = {
    generateAppConfig: function(taskOptions) {
        console.log('generateAppConfig', taskOptions);
        return {}
    }
};