'use strict';

/**
 * Acts as an override for module loading. Certain modules
 * need to load modules other than themselves to function.
 *
 * @type {Object}
 */
var loadingOverrides = {
    'watch': ['html', 'styles', 'scripts', 'watch'],
    'build': ['html', 'images', 'styles', 'scripts', 'build'],
    'default': ['html', 'images', 'styles', 'scripts', 'build', 'default']
};

/**
 * Acts as a module loader which gives us the ability to override certain
 * tasks and load more modules or a totally different set of modules.
 */
module.exports = function() {
    var args = require('yargs').argv;
    var desiredModule = (args._[0] || 'default');
    var modulesToLoad = loadingOverrides[desiredModule] || [desiredModule];

    modulesToLoad.forEach(function(module) {
        console.log(' FE Skeleton: Loading module - ' + module);
        require('./tasks/' + module + '/');
    });
};
