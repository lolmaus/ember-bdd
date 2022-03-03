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
      name: 'ember-bdd',
      ext: ['feature', 'spec', 'specification'],
      toTree: (tree) => {
        return new FeatureParser(tree, this.options);
      },
    });
  },

  treeForAddonTestSupport: function (tree) {
    // intentionally not calling _super here
    // so that can have our `import`'s be
    // import { ... } from 'ember-bdd/*';

    const Funnel = require('broccoli-funnel');

    const treeWithReexports = reexporter(this);
    const input = mergeTrees([tree, treeWithReexports]);

    const scopedInputTree = new Funnel(input, { destDir: this.name });

    return this.preprocessJs(scopedInputTree, '/', this.name, {
      registry: this.registry,
      treeType: 'addon-test-support',
    });
  },
};
