var winston = require('winston')
  , config  = require('./config')
  , Logger  = winston.Logger
  ;

var levels = {
  levels: {
    silly: 0,
    verbose: 1,
    info: 1,
    debug: 2,
    warn: 2,
    error: 3
  },
  colors: {
    silly: 'rainbow',
    verbose: 'green',
    info: 'blue',
    debug: 'yellow',
    warn: 'magenta',
    error: 'red'
  }
};

winston.addColors(levels.colors);

var logger = new Logger({
  transports: [
    new (winston.transports.Console)({
      level: 'silly',
      colorize: true
    }),
  ],
  level: config.log,
  levels: levels.levels
});

module.exports = logger;
