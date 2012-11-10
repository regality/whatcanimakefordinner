"use strict";

var confrodo    = require('confrodo') // one ring to rule them all
  , packagejson = __dirname + '/../package.json'
  , filename    = __dirname + '/' + (confrodo.env === 'local' ? 'development' : confrodo.env) + '.json'
  , common      = __dirname + '/common.json'
  , config      = confrodo(packagejson, common, filename, 'ENV', 'ARGV');

module.exports = config;
