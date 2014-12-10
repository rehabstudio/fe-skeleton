'use strict';

// Adding promises to nodes global scope.
require('es6-promise').polyfill();

/**
 *  Acts as an override for module loading. Certain modules
 *  need to load modules other than themselves to function.
 */
var loadingOverrides = {
    'default': ['styles', 'scripts', 'default'],
    'build': ['styles', 'scripts', 'build']
};

// RequireJS has a templating module that needs loaded additionally.
var globalSettings = require('./_global');
if (globalSettings.moduleFormat === 'requirejs') {
    loadingOverrides.default.unshift('templates');
}

/**
 *  Acts as a module loader to require the necessary tasks for a
 *  particular task runner.
 *
 *  @param string runner - Either `gulp` or `grunt`.
 */
module.exports = function(runner) {
    var args = require('yargs').argv,
        desiredModule = (args._[0] || 'default'),                           // If no task specified, use `default`.
        modulesToLoad = loadingOverrides[desiredModule] || [desiredModule]; // Check for module loading overrides.

    modulesToLoad.forEach(function(module) {
        console.log(' - Loading module', module);
        require('./tasks/' + module + '/' + runner + '.js');
    });
};