'use strict';

var globalSettings = require('../../_global');

module.exports = {
    /**
     *  Sets paths to be as specified else falls back to defaults.
     *
     *  @param {String} specifiedPath - Path of JS files relative to root.
     *  @return {Array}
     */
    buildSources: function(specifiedPath) {
        var sourceList = [];

        if (specifiedPath) {
            sourceList.push(specifiedPath);
        } else {
            sourceList = globalSettings.scriptSourcePaths;
        }

        return sourceList;
    }
};