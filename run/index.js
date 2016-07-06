'use strict';

/**
 * Loads the relevant modularised task that the user has requested.
 */
module.exports = function() {
    var args = require('yargs').argv;
    var desiredModule = (args._[0] || 'default');

    require('./tasks/' + desiredModule + '/');
};
