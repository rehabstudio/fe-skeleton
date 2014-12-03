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
        'sourcemap=none': true, // Hack until gulp-ruby-sass v1.0 is released: http://bit.ly/1yolgzq
        style: 'compact'
    },

    autoPrefixSettings: {
        browsers: ['last 2 versions', 'ios 6.1', 'android >= 4'],
        cascade: false
    }
};