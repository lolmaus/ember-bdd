'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const enumeratePremberURLs = require('./lib/enumerate-prember-urls');

const environment = process.env.EMBER_ENV || 'development';
const config = require('./config/environment')(environment);

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-composable-helpers': {
      only: [],
    },

    'ember-math-helpers': {
      only: [],
    },

    cssModules: {
      extension: 'module.scss',
      intermediateOutputPath: 'app/styles/_modules.scss',
    },

    fingerprint: {
      extensions: ['js', 'css', 'map'],
      fingerprintAssetMap: true,
      generateAssetMap: true,
      prepend: config.rootURL,
    },

    prember: {
      urls: ['/', ...enumeratePremberURLs()],
    },

    svgJar: {
      strategy: 'inline',
      sourceDirs: ['public/assets/icons'],
      optimizer: {
        plugins: [
          {
            inlineStyles: {
              onlyMatchedOnce: false, // this is needed to inline all styles, and remove the error prone <style>
            },
          },
        ],
      },
    },

    'ember-cli-favicon': {
      faviconsConfig: {
        appName: 'ember-bdd docs',
        appShortName: 'docs-app',
        appDescription: 'Docs for ember-bdd, a Cucumber-like BDD testing solution for Ember',
        developerName: 'kaliber5 GmbH',
        developerURL: 'https://www.kaliber5.de',
        lang: 'en-US',
        background: '#fff', // Background colour for flattened icons. `string`
        theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
        path: config.rootURL,
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('node_modules/ember-source/dist/ember-template-compiler.js');

  return app.toTree();
};
