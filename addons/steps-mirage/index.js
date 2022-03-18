'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
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
