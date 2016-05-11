'use strict';

module.exports = {

    /**
     * Locations of JavaScript source files. This array is used in
     * conjunction with JSHint and JSCS tasks (keeping things DRY).
     * Paths should be relative to the top-level gulpfile.
     *
     * @type {Array}
     */
    lintingSourcePaths: [
        './js/src/**/*.js',
        './run/**/*.js'
    ],

    /**
     * Settings for sourcemaps across JS and CSS bundles.
     *
     * @type {Object}
     */
    sourcemapOptions: {

        /**
         * Sourcemaps are built externally but there is two choices.
         * Source files can be embedded inside the map itself, or,
         * the source files can be referenced by the map and loaded
         * whenever you try to click line numbers in your dev tools.
         *
         * If your source files are not being served via a web server
         * then stick to using `External_EmbeddedFiles`.
         *
         * Potential Values:
         * 'External_EmbeddedFiles'
         * 'External_ReferencedFiles'
         *
         * @type {String}
         */
        type: 'External_EmbeddedFiles',

        /**
         * Sets the root path of where source files are hosted. This
         * path is relative to the source map. If you have sources in
         * different subpaths, an absolute path (from the domain root)
         * pointing to the source file root is recommended.
         *
         * NOTE: Only needs to be set for 'External_ReferencedFiles'.
         *
         * @type {String}
         */
        sourceRoot: '/'

    },

    /**
     * Where built output (CSS, JS, HTML, fonts, images) should be
     * stored on the filesystem. Can either be an absolute path or
     * relative path to the location of the gulpfile.
     *
     * @type {String}
     */
    destPath: './dist/',

    /**
     * Configuration settings for any task which needs them.
     * Keys should match the task name for consistency.
     *
     * @type {Object}
     */
    taskConfiguration: {
        build: {
            sourcePaths: ['./fonts/**/!(dir.txt)']
        },
        html: {
            sourcePaths: ['./html/**/*.html']
        },
        images: {
            sourcePaths: ['./img/**/!(dir.txt)'],
            imageminOptions: {
                svgoPlugins: [
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: false},
                    {convertPathData: {straightCurves: false}},
                    {cleanupIDs: false}
                ]
            }
        },
        server: {
            webserverSettings: {
                host: '0.0.0.0',
                port: process.env.PORT || 4321,
                https: false,
                open: true
            }
        },
        styles: {
            /**
             * A folder path that is prefixed with the global `destPath` to give a
             * standard destination for CSS bundles. This can be overridden per
             * bundle if for example some bundles need to go somewhere else.
             *
             * @type {String}
             */
            genericOutputFolder: './css/',

            /**
             * A manifest of CSS bundles needing to be created and output
             *
             * Bundle Object Keys:
             * `sourceFilePath` - The path to the SCSS entry file (relative to `gulpfile.js`).
             * `outputFileName` - The extensionless name of the output file.
             * `outputFolder` (Optional) - Overrides `genericOutputFolder`. Is relative to `gulpfile.js`.
             *
             * Example Bundles:
             * { sourceFilePath: './css/src/homepage.scss', outputFileName: 'homepage' },
             * { sourceFilePath: './css/src/about.scss', outputFileName: 'main', outputFolder: './modules/about-page/css/' }
             *
             * @type {Array}
             */
            bundles: [
            ],

            /**
             * Settings to be passed through to `gulp-sass` and `node-sass`.
             * NOTE: `compact` used instead of `compressed` to due sourcemap bug.
             *
             * @type {Object}
             */
            sassSettings: {
                outputStyle: 'compact'
            },

            /**
             * Settings to be passed through to `gulp-autoprefixer`.
             *
             * @type {Object}
             */
            autoPrefixSettings: {
                browsers: ['last 2 versions', 'iOS >= 7.1', 'Android >= 4'],
                cascade: false
            }
        },
        scripts: {
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
                    'drop_console': false,
                    'drop_debugger': false,
                    'warnings': false
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
                watch: false,
                entry: {
                },
                output: {
                    filename: '[name].js'
                },
                module: {
                    loaders: [
                        {test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=es2015'}
                    ]
                },
                plugins: [
                ]
            }
        },
        test: {
            configPath: __dirname + '/../karma.conf.js'
        },
        watch: {
            sourcePaths: {
                html: ['./html/**/*.html'],
                styles: ['./css/libs/**/*.scss', './css/src/**/*.scss'],
                scripts: ['./js/libs/**/*.js', './js/src/**/*.js']
            }
        }
    }

};
