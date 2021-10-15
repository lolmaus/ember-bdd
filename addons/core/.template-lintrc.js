'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-bare-strings': false,
    'no-curly-component-invocation': { allow: ['while-loading'] },
  },
};
