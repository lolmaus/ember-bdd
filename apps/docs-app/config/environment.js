'use strict';

module.exports = function (environment) {
  const ENV = {
    environment,

    modulePrefix: 'docs-app',
    podModulePrefix: 'docs-app/pods',
    rootURL: process.env.EMBER_ROOT_URL || '/',
    locationType: 'auto',
    apiNamespace: process.env.EMBER_API_NAMESPACE || '',
    apiHost: process.env.EMBER_API_HOST || '',

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_MODULE_UNIFICATION: true
        EMBER_METAL_TRACKED_PROPERTIES: true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      LOG_RESOLVER: process.env.EMBER_DEBUG_LOG_RESOLVER === 'true',
      LOG_ACTIVE_GENERATION: process.env.EMBER_DEBUG_LOG_ACTIVE_GENERATION === 'true',
      LOG_TRANSITIONS: process.env.EMBER_DEBUG_LOG_TRANSITIONS === 'true',
      LOG_TRANSITIONS_INTERNAL: process.env.EMBER_DEBUG_LOG_TRANSITIONS_INTERNAL === 'true',
      LOG_VIEW_LOOKUPS: process.env.EMBER_DEBUG_LOG_VIEW_LOOKUPS === 'true',
    },

    fastboot: {
      hostWhitelist: [/^localhost:\d+$/],
    },
  };

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
