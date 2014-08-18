'use strict';

/**
 * index.js
 *
 * Loads all definitions in the /tasks folder.
 */

module.exports = function(runner) {

    console.log('Task runner: ', runner);

    var fs = require('fs');
    var modules = fs.readdirSync('./run/tasks').filter(function (file) {
        return fs.statSync('./run/tasks/' + file).isDirectory();
    });

    modules.forEach(function(mod) {
        console.log(' - Loading module', mod);
        var t = require('./tasks/' + mod + '/' + runner + '.js');
    });

};



