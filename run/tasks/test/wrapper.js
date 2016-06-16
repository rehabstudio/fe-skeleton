'use strict';

/**
 * NOTE: The path used in the first parameter of require.context cannot be
 * a variable or an expression because webpack parses this file differently
 * than normal.
 *
 * If you require JavaScript test specifications from other folders that
 * aren't sub-folders of the one listed below, duplicate the code below
 * and change the path of the second set to be whatever you require.
 *
 * For more information, see here:
 * https://webpack.github.io/docs/context.html
 */

// Creates a require context to the top-level JS folder.
var testsContext = require.context('../../../js/', true, /\.spec\.js$/);

// Takes the matching files found from the context above and passes them
// into the context function, which converts the paths into require calls.
testsContext.keys().forEach(testsContext);
