'use strict';

module.exports = {
  '**/*.ts': () => 'yarn lint:ts',
  '**/*.{js,ts}': 'yarn lint:eslint:fix',
  '**/*.hbs': 'yarn lint:etl:fix',
};
