"use strict";

var fs       = require('fs')
  , mongoose = require('mongoose')
  , log      = require('../log')
  , config   = require('../config')
  , files    = fs.readdirSync(__dirname)
  , db       = mongoose.createConnection(config.mongo)
  ;

[
  'error', 'disconnected', 'open',
  'close', 'reconnected',  'fullsetup'
].forEach(function(e) {
  db.on(e, function() {
    log.info('mongo ' + e + ' event');
    if (arguments.length > 0) {
      console.log(arguments);
    }
  });
});

files.forEach(function(file) {
  var path = __dirname + '/' + file;
  var stats = fs.statSync(path);
  if (file === 'index.js') return;
  if (stats.isDirectory()) return;
  var match = /^(.*?([A-Za-z_]*))\.js$/.exec(file);
  if (!match) return;
  var name = match[2].split('_').map(function(v) {
    return v.charAt(0).toUpperCase() + v.slice(1);
  }).join('');
  log.info('Loading model ' + name);
  var model = require(path);
  model = db.model(name, model);
  exports[name] = model;
});

