const fs = require('fs');

const DEFAULT_DOTENV_NAME = 'dev-normal';

module.exports = function (/* env */) {
  const dotenvName =
    process.env.DOTENV && process.env.DOTENV.length > 0 ? process.env.DOTENV : DEFAULT_DOTENV_NAME;

  const dotenvFileName = `.env-${dotenvName}`;

  if (fs.existsSync(dotenvFileName)) {
    console.info(`Using dotenv file: ${dotenvFileName}`); // eslint-disable-line no-console
  } else {
    console.warn(
      `dot-env file not found: ${dotenvFileName}, assuming env vars are passed manually`
    ); // eslint-disable-line no-console
  }

  return {
    clientAllowedKeys: [],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false,
    path: dotenvFileName,
  };
};
