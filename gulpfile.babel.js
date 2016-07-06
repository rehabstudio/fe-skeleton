import {argv as args} from 'yargs';

/**
 * Requires in the relevant gulp task module.
 *
 * @param {String} moduleName - Corresponding gulp task name / folder.
 */
function loadModule(moduleName = 'default') {
    console.log(`Loading Module: ${moduleName}`);
    require(`./run/tasks/${moduleName}/`);
}

loadModule(args._[0]);
