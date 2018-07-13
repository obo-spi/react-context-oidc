import { Log } from 'oidc-client';

let _level = Log.DEBUG;
let logger = console;

export const setLogger = (level, logger) => {
  // Levels are ordered from most to least verbose.
  // The DEBUG level includes all the log levels.
  const validOidcClientLevels = [
    Log.DEBUG, // 4
    Log.INFO, // 3
    Log.WARN, // 2
    Log.ERROR, // 1
    Log.NONE // 0
  ];

  if (!validOidcClientLevels.includes(level)) {
    const levels = validOidcClientLevels.join(', ');
    const msg = `The log level must be one of ${levels}`;
    throw new RangeError(msg);
  }

  _level = level;
  Log.level = level;
  Log.logger = logger;
};

const debug = msg => {
  if (_level >= Log.DEBUG) {
    /* tslint:disable no-console */
    logger.debug(`DEBUG [OpenIdConnect] ${msg}`);
  }
};

const info = msg => {
  if (_level >= Log.INFO) {
    /* tslint:disable no-console */
    logger.info(`INFO [OpenIdConnect] ${msg}`);
  }
};

const warn = msg => {
  if (_level >= Log.WARN) {
    /* tslint:disable no-console */
    logger.warn(`WARN [OpenIdConnect] ${msg}`);
  }
};

const error = msg => {
  if (_level >= Log.ERROR) {
    /* tslint:disable no-console */
    logger.error(`ERROR [OpenIdConnect] ${msg}`);
  }
};

export const oidcLog = {
  debug,
  info,
  warn,
  error
};
