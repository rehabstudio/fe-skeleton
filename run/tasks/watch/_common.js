'use strict';

var _ = require('underscore');

module.exports = {
    watchPaths: {
        styles: ['./css/libs/**/*.scss', './css/src/**/*.scss'],
        scripts: ['./js/libs/**/*.js', './js/src/**/*.js', '!./js/src/templates/**/*.js'],
        templates: ['./js/src/templates/**/*.hbs']
    },

    /**
     *  Cycles through each of the supplied arguments and triggers
     *  the relevant watch functions. If no arguments were supplied
     *  then we start all watches.
     *
     *  @param object args - CLI arguments.
     *  @param object watchFunctions - Task-runner specific methods.
     */
    setupWatchers: function(args, watchFunctions) {
        if (!args.watchType) {
            var watchMethods = _.keys(watchFunctions);
        } else {
            var watchMethods = args.watchType.split(',');
            watchMethods = watchMethods.map(function(currentValue) {
                return currentValue.trim();
            });
        }

        for (var i = 0, length = watchMethods.length; i < length; i++) {
            var key = watchMethods[i];
            if (watchFunctions.hasOwnProperty(key)) {
                watchFunctions[key]();
            }
        }
    }
};