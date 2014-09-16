// Create an array that will hold our paths to test files.
var testFiles = [];

// Create a Regexp that will identify from a list of files, which ones are tests.
var testFileRegexp = /\.spec\.js$/;

// Cycle through all files Karma is aware of and pick out the tests.
// Normalizes test file paths into RequireJS module names.
Object.keys(window.__karma__.files).forEach(function(file) {
    if (testFileRegexp.test(file)) {
        var filePath = file.replace(/^\/base\/js\//, '');
        filePath = filePath.replace(/\.js$/, '');
        testFiles.push(filePath);
    }
});

// Karma serves files under `/base`, which is the basePath from your config file.
// Our initial RequireJS file sets up the correct baseUrl then loads the main config file.
// This config file includes all the path and shim information relevant to the project.
require.config({
    baseUrl: '/base/js/',

    deps: ['src/config.r'],

    callback: function() {
        // Our project config file overwrites the Karma specific `baseUrl` so we need to put it back
        // to the correct one, then also disable urlArgs cache-busting as Karma dislikes it. Now that
        // we have the main config file of paths / shims, we load the tests and start Karma.
        require.config({
            baseUrl: '/base/js',

            urlArgs: '',

            deps: testFiles,

            callback: function() {
                window.__karma__.start();
            }
        });
    }
});