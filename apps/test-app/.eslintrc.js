'use strict';

const originalConfig = require('../../addons/core/.eslintrc.js');

module.exports = {
  ...originalConfig,
  parserOptions: {
    ...originalConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
};
