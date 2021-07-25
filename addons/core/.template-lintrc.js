'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-bare-strings': true,
    'no-curly-component-invocation': { allow: ['while-loading'] },
  },
};
