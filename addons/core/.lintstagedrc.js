'use strict';

module.exports = {
  '**/*.ts': () => 'yarn lint:tsc',
  '**/*.{js,ts}': 'yarn lint:eslint:fix',
  '**/*.hbs': 'yarn lint:etl:fix',
};
