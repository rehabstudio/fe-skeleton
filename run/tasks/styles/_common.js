'use strict';

module.exports = {
    srcDirectory: './css/src/',

    srcPath: '*.scss',

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