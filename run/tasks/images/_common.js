'use strict';

module.exports = {
    srcPaths: ['./img/**/!(dir.txt)'],

    destPath: './img/',

    svgoPlugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: false },
        { convertPathData: { straightCurves: false } },
        { cleanupIDs: false }
    ]
};