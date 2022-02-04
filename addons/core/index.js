'use strict';

const FeatureParser = require('./lib/feature-parser');
const reexporter = require('./lib/reexporter');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  options: {
    autoImport: {
      webpack: {
        resolve: {
          fallback: {
            fs: false,
            path: false,
          },
        },
        node: {
          global: true,
        },
      },
    },
  },

  setupPreprocessorRegistry(type, registry) {
    registry.add('js', {
      name: 'ember-cli-yadda',
      ext: ['feature', 'spec', 'specification'],
      toTree: (tree) => {
        return new FeatureParser(tree, this.options);
      },
    });
  },

  treeForAddonTestSupport: function (tree) {
    const treeWithReexports = reexporter(this);
    const resultingTree = mergeTrees([tree, treeWithReexports]);

    return this._super.treeForAddonTestSupport.call(this, resultingTree);
  },
};
