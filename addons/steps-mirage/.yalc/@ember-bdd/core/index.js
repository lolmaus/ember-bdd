'use strict';

const FeatureParser = require('./lib/feature-parser');

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

    const scopedInputTree = new Funnel(tree, { destDir: this.name });

    return this.preprocessJs(scopedInputTree, '/', this.name, {
      registry: this.registry,
      treeType: 'addon-test-support',
    });
  },
};
