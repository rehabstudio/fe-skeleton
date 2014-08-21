'use strict';

/**
 *  Acts as a module loader to require all tasks for a
 *  particular task runner.
 *
 *  @param string runner - Either `gulp` or `grunt`.
 */

module.exports = function(runner) {
    console.log('Task runner:', runner);

    var fs = require('fs');
    var modules = fs.readdirSync('./run/tasks').filter(function (file) {
        return fs.statSync('./run/tasks/' + file).isDirectory();
    });

    modules.forEach(function(module) {
        console.log(' - Loading module', module);
        require('./tasks/' + module + '/' + runner + '.js');
    });
};