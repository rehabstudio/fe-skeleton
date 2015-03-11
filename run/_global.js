'use strict';

module.exports = {

    /**
     *  Where built output (CSS, JS, HTML, fonts, images) should be stored
     *  on the filesystem. Can either be an absolute path or relative path
     *  to the location of the gulpfile.
     */
    destPath: './dist/',

    /**
     *  Sourcemaps are built externally but there is two choices. Source
     *  files can be embedded inside the map itself, or, the source files
     *  can be referenced by the map and loaded whenever you try to click
     *  line numbers in your dev tools.
     *
     *  Potential Values:
     *  'External_EmbeddedFiles'
     *  'External_ReferencedFiles'
     */
    sourcemapType: 'External_ReferencedFiles'

};
