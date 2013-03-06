"use strict";

var confrodo    = require('confrodo') // one ring to rule them all
  , packagejson = __dirname + '/../package.json'
  , filename    = __dirname + '/' + (confrodo.env === 'local' ? 'development' : confrodo.env) + '.json'
  , common      = __dirname + '/common.json'
  , config      = confrodo(packagejson, common, filename, 'ENV', 'ARGV');

config.mongo = config.mongo.replace('username', config.mongousername);
config.mongo = config.mongo.replace('password', config.mongopassword);
console.log(config);
module.exports = config;
