'use strict';

module.exports = {
    srcDirectory: './css/src/',

    srcPath: '*.scss',

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