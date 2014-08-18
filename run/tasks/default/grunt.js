'use strict';

/**
 * Test default task.
 */

var grunt = require('grunt');
var common = require('./_common');

grunt.registerTask('default', function() {
    console.log('This is a Grunt task');
    common._sayHello();
});
