'use strict';

const originalConfig = require('../core/.eslintrc.js');

module.exports = {
  ...originalConfig,
  parserOptions: {
    ...originalConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
};
