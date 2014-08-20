module.exports = {
    srcPaths: ['./css/src/*.scss'],

    sassSettings: {
        noCache: true,
        sourcemap: true,
        style: 'compact'
    },

    autoPrefixSettings: {
        browsers: ["last 2 versions", "> 1%", "ie 8", "ie 7"]
    }
};