/* eslint-env node */

'use strict';

const StaticSiteJson = require('broccoli-static-site-json');
const broccoliMergeTrees = require('broccoli-merge-trees');
const showdown = require('showdown');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    showdown.setFlavor('github');
    showdown.setOption('ghCompatibleHeaderId', true);

    const inputFolder = '../../docs/';

    const config = {
      attributes: ['title', 'index', 'parent', 'sectionOnly'],
      contentFolder: `api/pages`, // output folder
      type: 'pages', // JSONAPI resource name
    };

    return broccoliMergeTrees(
      [
        // Collated sparse records
        new StaticSiteJson(inputFolder, {
          ...config,
          collate: true,
          contentTypes: [],
        }),

        // Individual full records
        new StaticSiteJson(inputFolder, {
          ...config,
          contentTypes: ['html'],
        }),
      ],
      {
        overwrite: true,
      }
    );
  },
};
