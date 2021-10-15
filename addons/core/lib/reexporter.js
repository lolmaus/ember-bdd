'use strict';

const FileCreator = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

const moduleNames = ['annotations', 'dictionary', 'label-overrides', 'steps'];
const sourcePath = 'tests/bdd/';
const targetPath = 'app/';

// https://github.com/briarsweetbriar/ember-get-config/blob/v0.3.0/index.js
function findRoot(current) {
  let app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
}

module.exports = function (context) {
  const appName = findRoot(context).project.config(process.env.EMBER_ENV).modulePrefix;

  const reexportedTrees = moduleNames.map((moduleName) => {
    const targetFileName = `${targetPath}${moduleName}.js`;
    const sourceModuleName = `${appName}/${sourcePath}${moduleName}`;

    const content = `
import requireModule from 'ember-require-module';

export default requireModule('${sourceModuleName}') ?? null;
    `;

    return new FileCreator(targetFileName, content);
  });

  return mergeTrees(reexportedTrees);
};
