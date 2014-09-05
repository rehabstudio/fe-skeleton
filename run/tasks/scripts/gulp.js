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
    globalSettings = require('../../_global');

function _requireJS() {
    var _ = require('underscore'),
        requirejs = require('requirejs');

    for (var i = 0, length = common.requirejs.bundles.length; i < length; i++) {
        var thisBuild = common.requirejs.bundles[i],
            combinedOptions = _.extend({}, common.requirejs.defaults, thisBuild);

        requirejs.optimize(combinedOptions, function(buildOutput) {
            console.log(buildOutput);
        });
    }
}

function _browserify() {
    console.log('TODO: Browserify.');
}

gulp.task('scripts', function() {
    if (globalSettings.moduleFormat === 'requirejs') {
        _requireJS();
    } else {
        _browserify();
    }
});