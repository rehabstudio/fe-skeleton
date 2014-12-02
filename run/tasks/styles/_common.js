'use strict';

module.exports = {
    /**
     *  An array of objects symbolising bundles requiring built.
     *
     *  Example Bundles:
     *  { srcPath: './css/src/', fileName: 'homepage' },
     *  { srcPath: './css/src/', fileName: 'contact-us' }
     */
    bundles: [
    ],

    destPath: './css/',

    sassSettings: {
        noCache: true,
        sourcemap: true,
        style: 'compact'
    },

    autoPrefixSettings: {
        browsers: ['last 2 versions', 'ios 6.1', 'android >= 4']
    }
};