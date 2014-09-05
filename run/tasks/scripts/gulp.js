'use strict';

/**
 *  Concatenates and minifys JS source files.
 *
 *  Example Usage:
 *  gulp scripts
 */

var gulp = require('gulp'),
    args = require('yargs').argv,
    common = require('./_common'),
    globalSettings = require('../../_global'),
    _ = require('underscore'),
    requirejs = require('requirejs');

gulp.task('scripts', function() {
    for (var i = 0, length = common.bundles.length; i < length; i++) {
        var thisBuild = common.bundles[i],
            combinedOptions = _.extend({}, common.defaults, thisBuild);

        requirejs.optimize(combinedOptions, function(buildOutput) {
            console.log(buildOutput);
        });
    }
});